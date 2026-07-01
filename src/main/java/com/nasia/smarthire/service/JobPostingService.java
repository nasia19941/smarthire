package com.nasia.smarthire.service;

import com.nasia.smarthire.model.JobPosting;

import java.util.List;

public interface JobPostingService {
    JobPosting create(JobPosting jobPosting);
    JobPosting getJobPostingById(Long id);
    List<JobPosting> getAllJobPostings();
    JobPosting update(Long id,JobPosting jobPosting);
    void deleteJobPosting(Long id);
}
