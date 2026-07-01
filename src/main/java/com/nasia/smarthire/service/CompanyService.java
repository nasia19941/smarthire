package com.nasia.smarthire.service;

import com.nasia.smarthire.model.Company;

import java.util.List;

public interface CompanyService {
    Company createCompany(Company company);
    Company getCompanyById(Long id);
    List<Company> getAllCompanies();
    Company updateCompany(Long id, Company company);
    void deleteCompany(Long id);
}
