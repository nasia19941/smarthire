package com.nasia.smarthire.controller;

import com.nasia.smarthire.dto.CompanyDTO;
import com.nasia.smarthire.mapper.SmartHireMapper;
import com.nasia.smarthire.model.Company;
import com.nasia.smarthire.service.CompanyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@Slf4j
public class CompanyController {
    private final CompanyService companyService;
    private final SmartHireMapper mapper;

    @PostMapping
    public CompanyDTO createCompany(@RequestBody Company company) {
        return mapper.toCompanyDTO(companyService.createCompany(company));
    }

    @GetMapping("/{id}")
    public CompanyDTO getCompanyById(@PathVariable Long id) {
        return mapper.toCompanyDTO(companyService.getCompanyById(id));
    }

    @GetMapping
    public List<CompanyDTO> getAllCompanies() {
        return companyService.getAllCompanies()
                .stream()
                .map(mapper::toCompanyDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public CompanyDTO updateCompany(@PathVariable Long id, @RequestBody Company company) {
        return mapper.toCompanyDTO(companyService.updateCompany(id, company));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
    }
}