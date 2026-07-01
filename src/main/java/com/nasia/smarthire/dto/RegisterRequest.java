package com.nasia.smarthire.dto;

import com.nasia.smarthire.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Role role;
}