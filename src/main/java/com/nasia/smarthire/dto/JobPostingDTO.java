package com.nasia.smarthire.dto;

import com.nasia.smarthire.model.JobStatus;
import com.nasia.smarthire.model.WorkType;
import lombok.Data;

@Data
public class JobPostingDTO {
    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String location;
    private String workSchedule;
    private WorkType workType;
    private Long salary;
    private String benefits;
    private JobStatus status;
    private CompanyDTO company;
}