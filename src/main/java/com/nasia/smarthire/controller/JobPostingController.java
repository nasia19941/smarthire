package com.nasia.smarthire.controller;

import com.nasia.smarthire.model.JobPosting;
import com.nasia.smarthire.service.JobPostingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobposting")
@RequiredArgsConstructor
@Slf4j
public class JobPostingController {
    private final JobPostingService jobPostingService;

    @PostMapping
    public JobPosting create(@RequestBody JobPosting jobPosting){
        return jobPostingService.create(jobPosting);
    }
    @GetMapping("/{id}")
    public JobPosting getJobPostingById(@PathVariable Long id){
        return jobPostingService.getJobPostingById(id);
    }
    @GetMapping
    public List<JobPosting> getAllJobPostings(){
       return jobPostingService.getAllJobPostings();
    }
    @PutMapping("/{id}")
    public JobPosting update(@PathVariable Long id ,@RequestBody JobPosting jobPosting){
        return jobPostingService.update(id ,jobPosting);
    }
    @DeleteMapping("/{id}")
    public void  delete(@PathVariable Long id){
        jobPostingService.deleteJobPosting(id);
    }
}
