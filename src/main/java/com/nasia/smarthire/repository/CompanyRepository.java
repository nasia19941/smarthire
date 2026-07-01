package com.nasia.smarthire.repository;

import com.nasia.smarthire.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company,Long> {

}
