package com.jobnet.business.services.impl;

import com.jobnet.business.dtos.requests.*;
import com.jobnet.business.dtos.responses.BusinessResponse;
import com.jobnet.business.mappers.BusinessMapper;
import com.jobnet.business.models.Business;
import com.jobnet.business.models.enums.EFollowerAction;
import com.jobnet.business.repositories.BusinessRepository;
import com.jobnet.business.services.IBusinessService;
import com.jobnet.clients.business.BusinessRegisterRequest;
import com.jobnet.common.dtos.PaginationResponse;
import com.jobnet.common.exceptions.DataIntegrityViolationException;
import com.jobnet.common.exceptions.ResourceNotFoundException;
import com.jobnet.common.s3.S3Service;
import com.jobnet.common.utils.MongoUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class BusinessService implements IBusinessService {

    private final BusinessRepository businessRepository;
    private final MongoTemplate mongoTemplate;
    private final S3Service s3Service;
    private final BusinessMapper businessMapper;

    @Override
    public PaginationResponse getBusinesses(
        Integer page,
        Integer pageSize,
        List<String> sortBy,
        String name,
        String emailDomain,
        String phone,
        String status,
        Boolean isDeleted
    ) {
        Pageable pageable = PageRequest.of(
            page - 1,
            pageSize,
            MongoUtil.getSort(sortBy)
        );
        Query query = new Query();

        if (!StringUtils.isBlank(name))
            query.addCriteria(Criteria.where("name").regex(name, "i"));
        if (!StringUtils.isBlank(emailDomain))
            query.addCriteria(Criteria.where("emailDomain").is(emailDomain));
        if (!StringUtils.isBlank(phone))
            query.addCriteria(Criteria.where("phone").regex(phone));
        if (!StringUtils.isBlank(status))
            query.addCriteria(Criteria.where("status").is(status));
        if (isDeleted != null)
            query.addCriteria(Criteria.where("isDeleted").is(isDeleted));

        long count = mongoTemplate.count(query, Business.class);
        List<Business> businesses = mongoTemplate.find(query.with(pageable), Business.class);
        Page<Business> businessPage = PageableExecutionUtils.getPage(
            businesses,
            pageable,
            () -> count
        );

        PaginationResponse paginationResponse = this.getPaginationResponse(businessPage);
        log.info("Get businesses - page={}, pageSize={}: {}",page, pageSize, paginationResponse);
        return paginationResponse;
    }

    @Override
    public BusinessResponse getBusinessById(String id) {
        Business business = this.findByIdOrElseThrow(id);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Get business by id: {}",businessResponse);
        return businessResponse;
    }

    @Override
    public BusinessResponse createBusiness(BusinessRegisterRequest request) {
        if (businessRepository.existsByEmailDomain(request.emailDomain()))
            throw new DataIntegrityViolationException("Email domain is already in use.");

        Business _business = businessMapper.convertToBusiness.apply(request);
        _business.setFollowers(new ArrayList<>());
        _business.setTotalFollowers(0);
        _business.setCreatedAt(LocalDateTime.now());
        _business.setStatus(Business.EStatus.Pending);
        _business.setIsDeleted(false);
        Business business = businessRepository.save(_business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Create business by auth: {}", businessResponse);

        return businessResponse;
    }

    @Override
    public BusinessResponse updateBusinessGeneralInfo(String id, BusinessGeneralInfo request) {
        Business business = this.findByIdOrElseThrow(id);
        business.setName(request.getName());
        business.setType(Business.EType.valueOf(request.getType()));
        business.setCountry(request.getCountry());
        business.setEmployeeQuantity(request.getEmployeeQuantity());
        business.setFoundedYear(request.getFoundedYear());
        businessRepository.save(business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Updated business general info by auth: {}", businessResponse);
        return businessResponse;
    }

    @Override
    public BusinessResponse updateBusinessIntroductionInfo(String id, BusinessIntroductionInfo request) {
        Business business = this.findByIdOrElseThrow(id);
        business.setDescription(request.getDescription());
        businessRepository.save(business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Update business introduction info by auth: {}", businessResponse);
        return businessResponse;
    }

    @Override
    public BusinessResponse updateBusinessContactInfo(String id, BusinessContactInfo request) {
        Business business = this.findByIdOrElseThrow(id);
        business.setPhone(request.getPhone());
        business.setWebsite(request.getWebsite());
        business.setLocations(request.getLocations());
        businessRepository.save(business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Update business contact info by auth: {}",businessResponse);
        return businessResponse;
    }

    @Override
    public BusinessResponse updateBusinessStatus(String id,StatusUpdateRequest request) {
        Business business = this.findByIdOrElseThrow(id);
        business.setStatus(Business.EStatus.valueOf(request.getStatus()));
        businessRepository.save(business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Update business status by auth: {}", businessResponse);
        return businessResponse;
    }

    @Override
    public BusinessResponse updateBusinessFollowers(String id, BusinessFollower request) {
        Business business = this.findByIdOrElseThrow(id);
        if(request.getStatus().name().equals(EFollowerAction.FOLLOW.name())){
            if(business.getFollowers().contains(request.getUserId())){
                throw new ResourceNotFoundException("User already followed.");
            }
            business.getFollowers().add(request.getUserId());
            business.setTotalFollowers(business.getTotalFollowers() + 1);
        }
        if(request.getStatus().name().equals(EFollowerAction.UNFOLLOW.name())){
            business.getFollowers().remove(request.getUserId());
            business.setTotalFollowers(business.getTotalFollowers() - 1);
        }
        business.setFollowers(business.getFollowers());
        businessRepository.save(business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Update business followers by auth: {}", businessResponse);
        return businessResponse;
    }

    @Override
    public void deleteBusinessById(String id, boolean isDeleted) {
        Business business = this.findByIdOrElseThrow(id);
        business.setIsDeleted(isDeleted);
        businessRepository.save(business);

        log.info("Delete business by auth: {}", business);
    }

    @Override
    public BusinessResponse uploadBusinessProfileImage(String id, MultipartFile file) {
        Business business = businessRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Business not found."));

        String imageId = StringUtils.isBlank(business.getProfileImageId())
            ? UUID.randomUUID().toString()
            : business.getProfileImageId();
        String filePath = "businesses/%s/%s".formatted(id, imageId);
        s3Service.putObject(filePath, file);

        business.setProfileImageId(imageId);
        businessRepository.save(business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Upload business by auth: {}",businessResponse);
        return businessResponse;
    }

    @Override
    public byte[] getBusinessProfileImage(String id) {
        Business business = businessRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Business not found."));

        String profileImageId = business.getProfileImageId();
        if (StringUtils.isBlank(profileImageId))
            throw new ResourceNotFoundException("Profile image not found.");

        String filePath = "businesses/%s/%s".formatted(id, profileImageId);

        log.info("Get business by auth: {}", business);
        return s3Service.getObject(filePath);
    }

    @Override
    public BusinessResponse updateBusinessBackgroundImage(String id, MultipartFile file) {
        Business business = this.findByIdOrElseThrow(id);

        String imageId = StringUtils.isBlank(business.getBackgroundImageId())
            ? UUID.randomUUID().toString()
            : business.getProfileImageId();
        String filePath = "businesses/%s/%s".formatted(id, imageId);
        s3Service.putObject(filePath, file);

        business.setBackgroundImageId(imageId);
        businessRepository.save(business);

        BusinessResponse businessResponse = this.getBusinessResponse(business);
        log.info("Updated business background image by auth: {}", businessResponse);
        return businessResponse;
    }

    @Override
    public byte[] getBusinessBackgroundImage(String id) {
        Business business = this.findByIdOrElseThrow(id);

        String imageId = business.getBackgroundImageId();
        if (StringUtils.isBlank(imageId))
            throw new ResourceNotFoundException("Background image not found.");

        String filePath = "businesses/%s/%s".formatted(id, imageId);

        log.info("Get business background image by auth: {}", business);
        return s3Service.getObject(filePath);
    }

    private Business findByIdOrElseThrow(String id) {
        return businessRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Business not found."));
    }

    private BusinessResponse getBusinessResponse(Business business) {
        BusinessResponse businessResponse = businessMapper.convertToBusinessResponse.apply(business);
        businessResponse.setFollowers(business.getFollowers());
        return businessResponse;
    }

    private PaginationResponse getPaginationResponse(Page<Business> page) {
        long totalElements = page.getTotalElements();
        int totalPages = page.getTotalPages();
        int currentPage = page.getNumber() + 1;
        boolean hasNextPage = page.hasNext();
        List<BusinessResponse> data = page.getContent().stream()
            .map(this::getBusinessResponse)
            .toList();

        return PaginationResponse.builder()
            .totalElements(totalElements)
            .totalPages(totalPages)
            .currentPage(currentPage)
            .hasNextPage(hasNextPage)
            .data(data)
            .build();
    }
}
