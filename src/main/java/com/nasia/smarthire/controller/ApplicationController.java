package com.nasia.smarthire.controller;

import com.nasia.smarthire.model.Application;
import com.nasia.smarthire.model.ApplicationStatus;
import com.nasia.smarthire.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application")
@RequiredArgsConstructor
@Slf4j
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping
    public Application create(@RequestBody Application application){
        return applicationService.create(application);
    }
    @PutMapping("/{id}")
    public Application update(@PathVariable Long id , @RequestBody Application application){
        return applicationService.update(id , application);
    }
    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id){
        return applicationService.getApplicationById(id);
    }
    @GetMapping
    public List<Application> getAllApplications(){
        return applicationService.getAllApplications();
    }
    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id){
        applicationService.deleteApplication(id);
    }
    @PutMapping("/{id}/status")
    public Application updateStatus(@PathVariable Long id, @RequestBody ApplicationStatus status){
        return applicationService.updateStatus(id,status);
    }

}
