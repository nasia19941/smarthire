package com.nasia.smarthire.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "job_posting_id")
    private JobPosting jobPosting;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime submittedAt;
    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;
    private String cvUrl;
    private Integer aiScore;
    private String aiSummary;
}
