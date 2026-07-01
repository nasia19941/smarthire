package com.nasia.smarthire.service;

import com.nasia.smarthire.model.User;

import java.util.List;

public interface UserService {
    User createUser (User user);
    User getUserById(Long Id);
    List<User> getAllUsers();
    User updateUser(Long Id , User user);
    void deleteUser (Long Id);
}
