package com.nasia.smarthire.service.impl;

import com.nasia.smarthire.exception.ResourceNotFoundException;
import com.nasia.smarthire.model.JobPosting;
import com.nasia.smarthire.repository.JobPostingRepository;
import com.nasia.smarthire.service.JobPostingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class JobPostingServiceImpl implements JobPostingService {
    private final JobPostingRepository jobPostingRepository;
    @Override
    public JobPosting create(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }

    @Override
    public JobPosting getJobPostingById(Long id) {
        return jobPostingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobPosting not found with id: " + id));
    }

    @Override
    public List<JobPosting> getAllJobPostings() {
        return jobPostingRepository.findAll();
    }

    @Override
    public JobPosting update(Long id, JobPosting jobPosting) {
        JobPosting existingJobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobPosting not found with id: " + id));

        existingJobPosting.setTitle(jobPosting.getTitle());
        existingJobPosting.setDescription(jobPosting.getDescription());
        existingJobPosting.setCompany(jobPosting.getCompany());
        existingJobPosting.setRequirements(jobPosting.getRequirements());
        existingJobPosting.setSalary(jobPosting.getSalary());
        existingJobPosting.setBenefits(jobPosting.getBenefits());
        existingJobPosting.setWorkType(jobPosting.getWorkType());
        existingJobPosting.setStatus(jobPosting.getStatus());
        existingJobPosting.setWorkSchedule(jobPosting.getWorkSchedule());

        return jobPostingRepository.save(existingJobPosting);
    }

    @Override
    public void deleteJobPosting(Long id) {
        jobPostingRepository.deleteById(id);

    }
}
