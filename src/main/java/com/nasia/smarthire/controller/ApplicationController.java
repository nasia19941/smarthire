package com.nasia.smarthire.controller;

import com.nasia.smarthire.dto.ApplicationDTO;
import com.nasia.smarthire.exception.ResourceNotFoundException;
import com.nasia.smarthire.mapper.SmartHireMapper;
import com.nasia.smarthire.model.Application;
import com.nasia.smarthire.model.ApplicationStatus;
import com.nasia.smarthire.model.User;
import com.nasia.smarthire.repository.UserRepository;
import com.nasia.smarthire.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/application")
@RequiredArgsConstructor
@Slf4j
public class ApplicationController {
    private final ApplicationService applicationService;
    private final SmartHireMapper mapper;
    private final UserRepository userRepository;

    @PostMapping
    public ApplicationDTO create(@RequestBody Application application) {
        // Πάρε τον τρέχοντα user από το SecurityContext
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        application.setUser(currentUser); // ignore client user.id
        return mapper.toApplicationDTO(applicationService.create(application));
    }

    @PutMapping("/{id}")
    public ApplicationDTO update(@PathVariable Long id, @RequestBody Application application) {
        return mapper.toApplicationDTO(applicationService.update(id, application));
    }

    @GetMapping("/{id}")
    public ApplicationDTO getApplicationById(@PathVariable Long id) {
        return mapper.toApplicationDTO(applicationService.getApplicationById(id));
    }

    @GetMapping
    @PreAuthorize("hasRole('HR_MANAGER') or hasRole('ADMIN')")
    public List<ApplicationDTO> getAllApplications() {
        return applicationService.getAllApplications()
                .stream()
                .map(mapper::toApplicationDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('HR_MANAGER') or hasRole('ADMIN')")
    public ApplicationDTO updateStatus(@PathVariable Long id, @RequestBody ApplicationStatus status) {
        return mapper.toApplicationDTO(applicationService.updateStatus(id, status));
    }

    @GetMapping("/user/{userId}")
    public List<ApplicationDTO> getApplicationsByUser(@PathVariable Long userId) {
        return applicationService.getApplicationsByUser(userId)
                .stream()
                .map(mapper::toApplicationDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('HR_MANAGER') or hasRole('ADMIN')")
    public List<ApplicationDTO> getApplicationsByJob(@PathVariable Long jobId) {
        return applicationService.getApplicationsByJobPosting(jobId)
                .stream()
                .map(mapper::toApplicationDTO)
                .collect(Collectors.toList());
    }
}