package com.nasia.smarthire.controller;

import com.nasia.smarthire.model.Company;
import com.nasia.smarthire.service.CompanyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@Slf4j
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return companyService.createCompany(company);
    }
    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }
    @GetMapping
    public List<Company> getAllCompanies(){
        return companyService.getAllCompanies();
    }
    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable Long id,@RequestBody Company company){
        return companyService.updateCompany(id,company);
    }
    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable Long id){
        companyService.deleteCompany(id);
    }

}
