package com.nasia.smarthire.dto;

import com.nasia.smarthire.model.ApplicationStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationDTO {
    private Long id;
    private String cvUrl;
    private ApplicationStatus applicationStatus;
    private Integer aiScore;
    private String aiSummary;
    private LocalDateTime submittedAt;
    private JobPostingDTO jobPosting;
    private UserDTO user;
}