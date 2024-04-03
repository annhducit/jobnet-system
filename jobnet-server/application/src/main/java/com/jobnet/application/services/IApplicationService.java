package com.jobnet.application.services;

import com.jobnet.application.dtos.requests.ApplicationCreateRequest;
import com.jobnet.application.dtos.requests.ApplicationStatusUpdateRequest;
import com.jobnet.application.dtos.responses.ApplicationResponse;
import com.jobnet.application.models.Application;
import com.jobnet.common.dtos.PaginationResponse;

import java.time.LocalDate;
import java.util.List;

public interface IApplicationService {

    PaginationResponse getApplications(
        Integer page,
        Integer pageSize,
        List<String> sortBy,
        String jobSeekerId,
        Application.EApplicationStatus applicationStatus
    );

    PaginationResponse getApplicationsByRecruiterId(
        String recruiterId,
        Integer page,
        Integer pageSize,
        String sortBy,
        List<Application.EApplicationStatus> applicationStatuses,
        LocalDate fromDate,
        LocalDate toDate
    );

    ApplicationResponse getApplicationById(String id);

    ApplicationResponse createApplication(String jobSeekerId, ApplicationCreateRequest applicationRequest);

    ApplicationResponse updateApplicationStatus(String id, ApplicationStatusUpdateRequest request);

    void deleteApplicationById(String id);

    boolean isSubmitted(String userId, String postId);
}
