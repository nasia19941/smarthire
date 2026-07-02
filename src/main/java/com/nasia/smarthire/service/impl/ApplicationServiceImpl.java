package com.nasia.smarthire.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nasia.smarthire.exception.ResourceNotFoundException;
import com.nasia.smarthire.model.Application;
import com.nasia.smarthire.model.ApplicationStatus;
import com.nasia.smarthire.model.JobPosting;
import com.nasia.smarthire.repository.ApplicationRepository;
import com.nasia.smarthire.repository.JobPostingRepository;
import com.nasia.smarthire.service.ApplicationService;
import com.nasia.smarthire.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final GeminiService geminiService;
    private final JobPostingRepository jobPostingRepository;

    @Override
    public Application create(Application application) {
        // Φόρτωσε το πλήρες JobPosting από τη βάση
        JobPosting jobPosting = jobPostingRepository.findById(
                        application.getJobPosting().getId())
                .orElseThrow(() -> new ResourceNotFoundException("JobPosting not found"));

        String requirements = jobPosting.getRequirements();
        String cvText = application.getCvUrl();

        // Καλούμε το Gemini AI
        String aiResponse = geminiService.analyzeCV(cvText, requirements);

        // Parse το JSON response
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> result = mapper.readValue(aiResponse, Map.class);
            application.setAiScore((Integer) result.get("score"));
            application.setAiSummary((String) result.get("summary"));
        } catch (Exception e) {
            log.error("Error parsing AI response: {}", e.getMessage());
            application.setAiScore(0);
            application.setAiSummary("AI analysis unavailable");
        }

        application.setSubmittedAt(java.time.LocalDateTime.now());
        application.setApplicationStatus(ApplicationStatus.PENDING);

        return applicationRepository.save(application);
    }

    @Override
    public Application update(Long id, Application application) {
        Application existingApplication = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));

        existingApplication.setSubmittedAt(application.getSubmittedAt());
        existingApplication.setAiScore(application.getAiScore());
        existingApplication.setAiSummary(application.getAiSummary());
        existingApplication.setApplicationStatus(application.getApplicationStatus());
        existingApplication.setCvUrl(application.getCvUrl());

        return applicationRepository.save(existingApplication);
    }

    @Override
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    @Override
    public Application updateStatus(Long id, ApplicationStatus status) {
        Application existingApplication = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));

        existingApplication.setApplicationStatus(status);

        return applicationRepository.save(existingApplication);
    }

}

