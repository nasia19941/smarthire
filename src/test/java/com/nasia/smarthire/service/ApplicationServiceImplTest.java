package com.nasia.smarthire.service;

import com.nasia.smarthire.exception.ResourceNotFoundException;
import com.nasia.smarthire.model.Application;
import com.nasia.smarthire.model.ApplicationStatus;
import com.nasia.smarthire.model.JobPosting;
import com.nasia.smarthire.repository.ApplicationRepository;
import com.nasia.smarthire.repository.JobPostingRepository;
import com.nasia.smarthire.service.impl.ApplicationServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ApplicationServiceImplTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private JobPostingRepository jobPostingRepository;

    @Mock
    private GeminiService geminiService;

    @InjectMocks
    private ApplicationServiceImpl applicationService;

    @Test
    void create_ShouldSaveApplicationWithPendingStatus() {
        JobPosting jobPosting = new JobPosting();
        jobPosting.setId(1L);
        jobPosting.setRequirements("Java, Spring Boot");

        Application application = new Application();
        application.setJobPosting(jobPosting);
        application.setCvUrl("Experienced Java developer");

        when(jobPostingRepository.findById(1L)).thenReturn(Optional.of(jobPosting));
        when(geminiService.analyzeCV(any(), any())).thenReturn("invalid json");
        when(applicationRepository.save(any())).thenReturn(application);

        Application result = applicationService.create(application);

        assertEquals(ApplicationStatus.PENDING, result.getApplicationStatus());
        verify(applicationRepository, times(1)).save(any());
    }

    @Test
    void getApplicationById_ShouldThrowWhenNotFound() {
        when(applicationRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> applicationService.getApplicationById(999L));
    }

    @Test
    void updateStatus_ShouldChangeApplicationStatus() {
        Application application = new Application();
        application.setId(1L);
        application.setApplicationStatus(ApplicationStatus.PENDING);

        when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));
        when(applicationRepository.save(any())).thenReturn(application);

        Application result = applicationService.updateStatus(1L, ApplicationStatus.ACCEPTED);

        assertEquals(ApplicationStatus.ACCEPTED, result.getApplicationStatus());
    }
}