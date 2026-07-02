package com.nasia.smarthire.dto;

import lombok.Data;

@Data
public class CompanyDTO {
    private Long id;
    private String companyName;
    private String website;
    private String description;
}