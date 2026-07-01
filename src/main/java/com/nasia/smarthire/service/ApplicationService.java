package com.nasia.smarthire.service;

import com.nasia.smarthire.model.Application;
import com.nasia.smarthire.model.ApplicationStatus;

import java.util.List;

public interface ApplicationService {
    Application create(Application application);
    Application update(Long id,Application application);
    Application getApplicationById(Long id);
    List<Application> getAllApplications();
    void deleteApplication(Long id);
    Application updateStatus(Long id, ApplicationStatus application);

}
