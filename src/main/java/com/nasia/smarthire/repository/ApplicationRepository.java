package com.nasia.smarthire.repository;

import com.nasia.smarthire.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
}
