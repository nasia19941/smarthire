package com.nasia.smarthire.dto;

import com.nasia.smarthire.model.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private Role role;
    // password εσκεμμένα λείπει!
}