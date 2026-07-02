package com.nasia.smarthire.controller;

import com.nasia.smarthire.dto.JobPostingDTO;
import com.nasia.smarthire.mapper.SmartHireMapper;
import com.nasia.smarthire.model.JobPosting;
import com.nasia.smarthire.service.JobPostingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobposting")
@RequiredArgsConstructor
@Slf4j
public class JobPostingController {
    private final JobPostingService jobPostingService;
    private final SmartHireMapper mapper;

    @PostMapping
    @PreAuthorize("hasRole('HR_MANAGER') or hasRole('ADMIN')")
    public JobPostingDTO create(@RequestBody JobPosting jobPosting) {
        return mapper.toJobPostingDTO(jobPostingService.create(jobPosting));
    }

    @GetMapping("/{id}")
    public JobPostingDTO getJobPostingById(@PathVariable Long id) {
        return mapper.toJobPostingDTO(jobPostingService.getJobPostingById(id));
    }

    @GetMapping
    public List<JobPostingDTO> getAllJobPostings() {
        return jobPostingService.getAllJobPostings()
                .stream()
                .map(mapper::toJobPostingDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HR_MANAGER') or hasRole('ADMIN')")
    public JobPostingDTO update(@PathVariable Long id, @RequestBody JobPosting jobPosting) {
        return mapper.toJobPostingDTO(jobPostingService.update(id, jobPosting));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HR_MANAGER') or hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        jobPostingService.deleteJobPosting(id);
    }
}