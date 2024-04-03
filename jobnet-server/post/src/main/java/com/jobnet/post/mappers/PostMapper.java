package com.jobnet.post.mappers;

import com.jobnet.post.dtos.requests.PostCreateRequest;
import com.jobnet.post.dtos.responses.PostResponse;
import com.jobnet.post.models.Post;
import com.jobnet.post.utils.SalaryUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.function.Function;

@Service
public class PostMapper {
    public Function<PostCreateRequest, Post> convertToPost =
        request ->
            Post.builder()
                .title(request.getTitle())
                .minSalary(SalaryUtils.parseSalary(request.getMinSalaryString()))
                .minSalaryString(request.getMinSalaryString())
                .maxSalary(SalaryUtils.parseSalary(request.getMaxSalaryString()))
                .maxSalaryString(request.getMaxSalaryString())
                .currency(request.getCurrency())
                .locations(request.getLocations())
                .workingFormat(request.getWorkingFormat())
                .description(request.getDescription())
                .yearsOfExperience(request.getYearsOfExperience())
                .otherRequirements(request.getOtherRequirements())
                .requisitionNumber(request.getRequisitionNumber())
                .applicationDeadline(
                    LocalDate.parse(request.getApplicationDeadline(), DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                )
                .build();

    public Function<Post, PostResponse> convertToPostResponse =
        post ->
            PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .profession(post.getProfession())
                .minSalary(post.getMinSalary())
                .minSalaryString(post.getMinSalaryString())
                .maxSalary(post.getMaxSalary())
                .maxSalaryString(post.getMaxSalaryString())
                .currency(post.getCurrency())
                .level(post.getLevel())
                .locations(post.getLocations())
                .workingFormat(post.getWorkingFormat())
                .benefits(post.getBenefits())
                .description(post.getDescription())
                .yearsOfExperience(post.getYearsOfExperience())
                .otherRequirements(post.getOtherRequirements())
                .requisitionNumber(post.getRequisitionNumber())
                .applicationDeadline(post.getApplicationDeadline())
                .jdId(post.getJdId())
                .recruiterId(post.getRecruiterId())
                .business(post.getBusiness())
                .activeStatus(post.getActiveStatus())
                .totalApplications(post.getTotalApplications())
                .totalViews(post.getTotalViews())
                .createdAt(post.getCreatedAt())
                .build();
}
