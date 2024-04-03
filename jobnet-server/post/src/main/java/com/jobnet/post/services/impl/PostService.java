package com.jobnet.post.services.impl;

import com.jobnet.clients.business.BusinessClient;
import com.jobnet.clients.business.BusinessResponse;
import com.jobnet.clients.user.UserClient;
import com.jobnet.clients.user.dtos.responses.RawRecruiterResponse;
import com.jobnet.common.dtos.PaginationResponse;
import com.jobnet.common.exceptions.DataIntegrityViolationException;
import com.jobnet.common.exceptions.ResourceNotFoundException;
import com.jobnet.common.s3.S3Service;
import com.jobnet.common.utils.MongoUtil;
import com.jobnet.post.dtos.requests.*;
import com.jobnet.post.dtos.responses.PostResponse;
import com.jobnet.post.mappers.PostMapper;
import com.jobnet.post.models.Level;
import com.jobnet.post.models.Post;
import com.jobnet.post.models.Profession;
import com.jobnet.post.repositories.PostRepository;
import com.jobnet.post.services.IBenefitService;
import com.jobnet.post.services.ILevelService;
import com.jobnet.post.services.IPostService;
import com.jobnet.post.services.IProfessionService;
import com.jobnet.post.utils.SalaryUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService implements IPostService {

    private final PostRepository postRepository;
    private final IProfessionService professionService;
    private final IBenefitService benefitService;
    private final ILevelService levelService;
    private final MongoTemplate mongoTemplate;
    private final BusinessClient businessClient;
    private final UserClient userClient;
    private final S3Service s3Service;
    private final PostMapper postMapper;

    @Override
    public PaginationResponse<List<PostResponse>> getPosts(
        Integer page,
        Integer pageSize,
        List<String> sortBy,
        String search,
        String categoryId,
        String professionId,
        BigInteger minSalary,
        BigInteger maxSalary,
        Integer provinceCode,
        String workingFormat,
        String recruiterId,
        String businessId,
        List<String> activeStatus,
        LocalDate fromDate,
        LocalDate toDate,
        Boolean isExpired
    ) {
        Pageable pageable = PageRequest.of(
            page - 1,
            pageSize,
            MongoUtil.getSort(sortBy)
        );
        Query query = new Query();

        if (!StringUtils.isBlank(search))
            query.addCriteria(Criteria.where("title").regex(search, "i"));
        if(!StringUtils.isBlank(categoryId) && StringUtils.isBlank(professionId))
            query.addCriteria(Criteria.where("profession.categoryId").is(categoryId));
        if (!StringUtils.isBlank(professionId))
            query.addCriteria(Criteria.where("profession._id").is(professionId));
        if (minSalary != null)
            query.addCriteria(Criteria.where("minSalary").gte(minSalary));
        if (maxSalary != null)
            query.addCriteria(Criteria.where("maxSalary").lte(maxSalary));
        if (provinceCode != null)
            query.addCriteria(Criteria.where("locations").elemMatch(
                Criteria.where("provinceCode").is(provinceCode))
            );
        if (!StringUtils.isBlank(workingFormat))
            query.addCriteria(Criteria.where("workingFormat").is(workingFormat));
        if (!StringUtils.isBlank(recruiterId))
            query.addCriteria(Criteria.where("recruiterId").is(recruiterId));
        if (!StringUtils.isBlank(businessId))
            query.addCriteria(Criteria.where("businessId").is(businessId));
        if (activeStatus != null)
            query.addCriteria(Criteria.where("activeStatus").in(activeStatus));
        if (fromDate != null)
            query.addCriteria(Criteria.where("createdAt").gte(fromDate));
        if (toDate != null)
            query.addCriteria(Criteria.where("createdAt").lte(toDate));
        if (isExpired != null)
            query.addCriteria(
                isExpired
                    ? Criteria.where("applicationDeadline").lte(LocalDate.now())
                    : Criteria.where("applicationDeadline").gt(LocalDate.now())
            );

        long count = mongoTemplate.count(query, Post.class);
        List<Post> posts = mongoTemplate.find(query.with(pageable), Post.class);
        Page<Post> postPage = PageableExecutionUtils.getPage(
            posts,
            pageable,
            () -> count
        );
        PaginationResponse<List<PostResponse>> response = this.getPaginationResponse(postPage);
        log.info("Get posts: {}", response);
        return response;
    }

    @Override
    public PostResponse getPostById(String id) {
        Post post = this.findByIdOrElseThrow(id);
        PostResponse response = this.getPostResponse(post);
        log.info("Get post by id - id={}: {}", id, response);
        return response;
    }

    @Override
    public PostResponse createPost(String userId, PostCreateRequest request) {

        // Check data
        if (postRepository.existsByTitle(request.getTitle()))
            throw new DataIntegrityViolationException("Title is already in use.");

        Post.Profession profession = this.getPostProfession(request.getProfessionId());
        
        Post.Level level = this.getPostLevel(request.getLevelId());
        List<Post.Benefit> benefits = this.getPostBenefits(request.getBenefitIds());
        RawRecruiterResponse recruiter = userClient.getRawRecruiterById(userId);
        Post.Business business = this.getPostBusiness(recruiter.getBusinessId());

        // Save new post
        Post _post = postMapper.convertToPost.apply(request);
        _post.setProfession(profession);
        _post.setLevel(level);
        _post.setBenefits(benefits);
        _post.setRecruiterId(userId);
        _post.setBusiness(business);
        _post.setActiveStatus(Post.EActiveStatus.Pending);
        _post.setTotalViews(0);
        _post.setCreatedAt(LocalDate.now());
        Post post = postRepository.save(_post);

        // Store JD file
        String jdId = UUID.randomUUID().toString();
        String filePath = "posts/%s/%s".formatted(post.getId(), jdId);
        s3Service.putObject(filePath, request.getJdFile());

        // Update post jdId
        post.setJdId(jdId);
        postRepository.save(post);

        // Generate response
        PostResponse response = postMapper.convertToPostResponse.apply(post);
        log.info("Create post: {}", response);
        return response;
    }

    @Override
    public PostResponse updatePostHeadingInfo(String id, PostHeadingInfoUpdateRequest request) {
        Post post = this.findByIdOrElseThrow(id);

        if (postRepository.existsByIdNotAndTitle(id, request.getTitle()))
            throw new DataIntegrityViolationException("Title is already in use.");

        post.setTitle(request.getTitle());
        post.setMinSalary(SalaryUtils.parseSalary(request.getMinSalaryString()));
        post.setMinSalaryString(request.getMinSalaryString());
        post.setMaxSalary(SalaryUtils.parseSalary(request.getMaxSalaryString()));
        post.setMaxSalaryString(request.getMaxSalaryString());
        post.setCurrency(request.getCurrency());
        post.setLocations(request.getLocations());
        post.setYearsOfExperience(request.getYearsOfExperience());
        post.setRequisitionNumber(request.getRequisitionNumber());
        post.setApplicationDeadline(request.getApplicationDeadline());
        postRepository.save(post);

        PostResponse response = this.getPostResponse(post);
        log.info("Update post heading info - id={}: {}", id, response);
        return response;
    }

    @Override
    public PostResponse updatePostDetailedInfo(String id, PostDetailedInfoUpdateRequest request) {
        Post post = this.findByIdOrElseThrow(id);

        post.setDescription(request.getDescription());
        post.setOtherRequirements(request.getOtherRequirements());
        postRepository.save(post);

        PostResponse response = this.getPostResponse(post);
        log.info("Update post detailed info - id={}: {}", id, response);
        return response;
    }

    @Override
    public PostResponse updatePostGeneralInfo(String id, PostGeneralInfoUpdateRequest request) {
        Post post = this.findByIdOrElseThrow(id);

        Post.Profession profession = this.getPostProfession(request.getProfessionId());
        Post.Level level = this.getPostLevel(request.getLevelId());
        List<Post.Benefit> benefits = this.getPostBenefits(request.getBenefitIds());

        post.setProfession(profession);
        post.setLevel(level);
        post.setBenefits(benefits);
        post.setWorkingFormat(request.getWorkingFormat());
        postRepository.save(post);

        PostResponse response = this.getPostResponse(post);
        log.info("Update post general info - id={}: {}", id, response);
        return response;
    }

    @Override
    public PostResponse updatePostActiveStatus(String id, PostActiveStatusUpdateRequest request) {
        Post post = this.findByIdOrElseThrow(id);
        
        // update profession total posts
        if (request.getActiveStatus().equals(Post.EActiveStatus.Opening.name())) {
            professionService.updateProfessionTotalPostsById(post.getProfession().getId(), +1);
        } else if(post.getActiveStatus().name().equals(Post.EActiveStatus.Opening.name())) {
            professionService.updateProfessionTotalPostsById(post.getProfession().getId(), -1);
        }
        
        post.setActiveStatus(Post.EActiveStatus.valueOf(request.getActiveStatus()));
        postRepository.save(post);

        PostResponse response = this.getPostResponse(post);
        log.info("Update post active status - id={}: {}", id, response);
        return response;
    }

    @Scheduled(fixedDelay = 24*60*60*1000) // 1 day
    public void updateActiveStatusBySchedule(){
        LocalDate now = LocalDate.now();
        List<Post> posts = postRepository.findPostsByActiveStatus(Post.EActiveStatus.Opening);
        postRepository.saveAll(
            posts.stream()
                .peek(post -> {
                    if (post.getApplicationDeadline().isBefore(now)) {
                        professionService.updateProfessionTotalPostsById(post.getProfession().getId(), -1);
                    }
                })
                .collect(Collectors.toList())
        );
    }
    
    @Override
    public byte[] getPostJd(String id) {
        Post post = this.findByIdOrElseThrow(id);

        String jdId = post.getJdId();
        String filePath = "posts/%s/%s".formatted(id, jdId);
        log.info("Get post JD - id={}", id);
        return s3Service.getObject(filePath);
    }

    @Override
    public List<String> getPostIdsByRecruiterId(String recruiterId) {
        List<Post> posts = postRepository.findPostsByRecruiterId(recruiterId);
        List<String> postIds = posts.stream()
            .map(Post::getId)
            .collect(Collectors.toList());
        log.info("Get post ids - recruiterId={}: {}", recruiterId, postIds);
        return postIds;
    }

    @Override
    public PostResponse updatePostTotalApplicationsById(String id, int number) {
        Post post = this.findByIdOrElseThrow(id);
        post.setTotalApplications(post.getTotalApplications() + number);
        postRepository.save(post);
        return this.getPostResponse(post);
    }

    private Post findByIdOrElseThrow(String id) {
        return postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found."));
    }

    private Post.Profession getPostProfession(String professionId) {
        Profession profession = professionService.findByIdOrElseThrow(professionId);
        return Post.Profession.builder()
            .id(professionId)
            .name(profession.getName())
            .build();
    }

    private Post.Level getPostLevel(String levelId) {
        Level level = levelService.findByIdOrElseThrow(levelId);
        return Post.Level.builder()
            .id(levelId)
            .name(level.getName())
            .build();
    }

    private List<Post.Benefit> getPostBenefits(List<String> benefitIds) {
        return benefitService.findAllById(benefitIds).stream()
            .map(benefit -> Post.Benefit.builder()
                .id(benefit.getId())
                .name(benefit.getName())
                .build()
            )
            .collect(Collectors.toList());
    }

    private Post.Business getPostBusiness(String businessId) {
        BusinessResponse business = businessClient.getBusinessById(businessId);
        return Post.Business.builder()
            .id(businessId)
            .name(business.getName())
            .profileImageId(business.getProfileImageId())
            .build();
    }
    
    

    private PaginationResponse<List<PostResponse>> getPaginationResponse(Page<Post> postPage) {
        long totalElements = postPage.getTotalElements();
        int totalPages = postPage.getTotalPages();
        int currentPage = postPage.getNumber() + 1;
        boolean hasNextPage = postPage.hasNext();
        List<PostResponse> postResponses = postPage.getContent().stream()
            .map(this::getPostResponse)
            .toList();

        return PaginationResponse.<List<PostResponse>>builder()
            .totalElements(totalElements)
            .totalPages(totalPages)
            .currentPage(currentPage)
            .hasNextPage(hasNextPage)
            .data(postResponses)
            .build();
    }

    private PostResponse getPostResponse(Post post) {
        return postMapper.convertToPostResponse.apply(post);
    }
}
