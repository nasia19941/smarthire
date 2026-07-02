package com.nasia.smarthire.mapper;

import com.nasia.smarthire.dto.*;
import com.nasia.smarthire.model.*;
import org.springframework.stereotype.Component;

@Component
public class SmartHireMapper {

    public CompanyDTO toCompanyDTO(Company company) {
        if (company == null) return null;
        CompanyDTO dto = new CompanyDTO();
        dto.setId(company.getId());
        dto.setCompanyName(company.getCompanyName());
        dto.setWebsite(company.getWebsite());
        dto.setDescription(company.getDescription());
        return dto;
    }

    public UserDTO toUserDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }

    public JobPostingDTO toJobPostingDTO(JobPosting jobPosting) {
        if (jobPosting == null) return null;
        JobPostingDTO dto = new JobPostingDTO();
        dto.setId(jobPosting.getId());
        dto.setTitle(jobPosting.getTitle());
        dto.setDescription(jobPosting.getDescription());
        dto.setRequirements(jobPosting.getRequirements());
        dto.setLocation(jobPosting.getLocation());
        dto.setWorkSchedule(jobPosting.getWorkSchedule());
        dto.setWorkType(jobPosting.getWorkType());
        dto.setSalary(jobPosting.getSalary());
        dto.setBenefits(jobPosting.getBenefits());
        dto.setStatus(jobPosting.getStatus());
        dto.setCompany(toCompanyDTO(jobPosting.getCompany()));
        return dto;
    }

    public ApplicationDTO toApplicationDTO(Application application) {
        if (application == null) return null;
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(application.getId());
        dto.setCvUrl(application.getCvUrl());
        dto.setApplicationStatus(application.getApplicationStatus());
        dto.setAiScore(application.getAiScore());
        dto.setAiSummary(application.getAiSummary());
        dto.setSubmittedAt(application.getSubmittedAt());
        dto.setJobPosting(toJobPostingDTO(application.getJobPosting()));
        dto.setUser(toUserDTO(application.getUser()));
        return dto;
    }
}