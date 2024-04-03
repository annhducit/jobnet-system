package com.jobnet.application.services.impl;

import com.jobnet.application.dtos.requests.ApplicationCreateRequest;
import com.jobnet.application.dtos.requests.ApplicationStatusUpdateRequest;
import com.jobnet.application.dtos.responses.ApplicationResponse;
import com.jobnet.application.mappers.ApplicationMapper;
import com.jobnet.application.models.Application;
import com.jobnet.application.repositories.ApplicationRepository;
import com.jobnet.application.services.IApplicationService;
import com.jobnet.clients.post.PostClient;
import com.jobnet.clients.post.PostResponse;
import com.jobnet.clients.resume.ResumeClient;
import com.jobnet.clients.resume.ResumeResponse;
import com.jobnet.clients.user.dtos.responses.JobSeekerResponse;
import com.jobnet.clients.user.UserClient;
import com.jobnet.common.dtos.PaginationResponse;
import com.jobnet.common.exceptions.DataIntegrityViolationException;
import com.jobnet.common.exceptions.ResourceNotFoundException;
import com.jobnet.common.utils.MongoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationService implements IApplicationService {

    private final ApplicationRepository applicationRepository;
    private final MongoTemplate mongoTemplate;
    private final ApplicationMapper applicationMapper;
    private final UserClient jobSeekerClient;
    private final PostClient postClient;
    private final ResumeClient resumeClient;
    private final static List<Application.EApplicationStatus> ALLOWED_APPLICATION_STATUSES =
        List.of(
            Application.EApplicationStatus.Submitted,
            Application.EApplicationStatus.Reviewed,
            Application.EApplicationStatus.Submitted
        );

    @Override
    public PaginationResponse getApplications(
        Integer page,
        Integer pageSize,
        List<String> sortBy,
        String jobSeekerId,
        Application.EApplicationStatus applicationStatus
    ) {
        Pageable pageable = PageRequest.of(
            page - 1,
            pageSize,
            MongoUtil.getSort(sortBy)
        );
        Query query = new Query();

        if (applicationStatus != null)
            query.addCriteria(Criteria.where("applicationStatus").is(applicationStatus));
        if (!StringUtils.isBlank(jobSeekerId))
            query.addCriteria(Criteria.where("jobSeekerId").is(jobSeekerId));

        Page<Application> applicationPage = this.getApplicationPage(query, pageable);

        PaginationResponse paginationResponse = this.getPaginationResponse(applicationPage);
        log.info("Get applications by auth: page={}, pageSize={}: {}",page, pageSize, paginationResponse);
        return paginationResponse;
    }

    @Override
    public PaginationResponse getApplicationsByRecruiterId(
        String recruiterId,
        Integer page,
        Integer pageSize,
        String sortBy,
        List<Application.EApplicationStatus> applicationStatuses,
        LocalDate fromDate,
        LocalDate toDate
    ) {
        Pageable pageable = PageRequest.of(
            page - 1,
            pageSize,
            Sort.by(sortBy)
        );
        Query query = new Query();

        List<String> postIds = postClient.getPostIdsByRecruiterId(recruiterId);
        query.addCriteria(Criteria.where("postId").in(postIds));

        if (applicationStatuses != null)
            query.addCriteria(Criteria.where("applicationStatus").in(applicationStatuses));
        if (fromDate != null)
            query.addCriteria(Criteria.where("createdAt").gte(fromDate));
        if (toDate != null)
            query.addCriteria(Criteria.where("createdAt").lte(toDate));

        Page<Application> applicationPage = this.getApplicationPage(query, pageable);

        PaginationResponse paginationResponse = this.getPaginationResponse(applicationPage);
        log.info("Get applications by auth: recruiter: {}, page={}, pageSize={}: {}", recruiterId,page, pageSize, paginationResponse);
        return paginationResponse;
    }

    @Override
    public ApplicationResponse getApplicationById(String id) {
        Application application = this.findByIdOrElseThrow(id);
        log.info("Get application by auth: {}", application.toString());
        return getApplicationResponse(application);
    }

    @Override
    public ApplicationResponse createApplication(String jobSeekerId, ApplicationCreateRequest request) {
        if (applicationRepository.existsByPostIdAndJobSeekerIdAndApplicationStatusIn(
            request.getPostId(),
            jobSeekerId,
            ALLOWED_APPLICATION_STATUSES
        ))
            throw new DataIntegrityViolationException("Application already exists.");

        JobSeekerResponse jobSeeker = jobSeekerClient.getJobSeekerById(jobSeekerId);
        PostResponse post = postClient.getPostById(request.getPostId());
        postClient.updatePostTotalApplicationsById(request.getPostId(), 1);
        ResumeResponse resume = resumeClient.getResumeById(request.getResumeId());

        // Save to database
        Application _application = applicationMapper.convertToApplication.apply(request);
        _application.setJobSeekerId(jobSeekerId);
        _application.setCreatedAt(LocalDateTime.now());
        _application.setApplicationStatus(Application.EApplicationStatus.Submitted);
        Application application = applicationRepository.save(_application);

        // Generate response
        ApplicationResponse response = applicationMapper.convertToApplicationResponse.apply(application);
        response.setJobSeeker(jobSeeker);
        response.setPost(post);
        response.setResume(resume);

        log.info("Create application by auth: {}", response);
        return response;
    }

    @Override
    public ApplicationResponse updateApplicationStatus(String id, ApplicationStatusUpdateRequest request) {
        Application application = this.findByIdOrElseThrow(id);

        application.setApplicationStatus(Application.EApplicationStatus.valueOf(request.getApplicationStatus()));
        applicationRepository.save(application);

        ApplicationResponse applicationResponse = this.getApplicationResponse(application);
        log.info("Update application status by auth: {}", applicationResponse);
        return applicationResponse;
    }

    @Override
    public void deleteApplicationById(String id) {
        Application application = findByIdOrElseThrow(id);
        postClient.updatePostTotalApplicationsById(application.getPostId(), -1);
        applicationRepository.deleteById(id);
        log.info("Deleted application by auth: id={}",id);
    }

    @Override
    public boolean isSubmitted(String userId, String postId) {
        return applicationRepository.existsByPostIdAndJobSeekerIdAndApplicationStatusIn(
            postId,
            userId,
            ALLOWED_APPLICATION_STATUSES
        );
    }

    private Application findByIdOrElseThrow(String id) {
        return applicationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Application not found."));
    }

    private Page<Application> getApplicationPage(Query query, Pageable pageable) {
        long count = mongoTemplate.count(query, Application.class);
        List<Application> applications = mongoTemplate.find(query.with(pageable), Application.class);

        return PageableExecutionUtils.getPage(
            applications,
            pageable,
            () -> count
        );
    }
    private PaginationResponse getPaginationResponse(Page<Application> applicationPage) {
        long totalElements = applicationPage.getTotalElements();
        int totalPages = applicationPage.getTotalPages();
        int currentPage = applicationPage.getNumber() + 1;
        boolean hasNextPage = applicationPage.hasNext();
        List<ApplicationResponse> applicationResponses = applicationPage.getContent().stream()
            .map(this::getApplicationResponse)
            .toList();

        return PaginationResponse.builder()
            .totalElements(totalElements)
            .totalPages(totalPages)
            .currentPage(currentPage)
            .hasNextPage(hasNextPage)
            .data(applicationResponses)
            .build();
    }
    
    private ApplicationResponse getApplicationResponse(Application application) {
        JobSeekerResponse jobSeeker = jobSeekerClient.getJobSeekerById(application.getJobSeekerId());
        PostResponse post = postClient.getPostById(application.getPostId());
        ResumeResponse resume = resumeClient.getResumeById(application.getResumeId());

        ApplicationResponse response = applicationMapper.convertToApplicationResponse.apply(application);
        response.setJobSeeker(jobSeeker);
        response.setPost(post);
        response.setResume(resume);
        return response;
    }
}
