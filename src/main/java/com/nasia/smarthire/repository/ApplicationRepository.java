package com.nasia.smarthire.repository;

import com.nasia.smarthire.model.Application;
import com.nasia.smarthire.model.JobPosting;
import com.nasia.smarthire.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByUser(User user);
    List<Application> findByJobPosting(JobPosting jobPosting);
}
