package com.nasia.smarthire.controller;

import com.nasia.smarthire.dto.UserDTO;
import com.nasia.smarthire.mapper.SmartHireMapper;
import com.nasia.smarthire.model.User;
import com.nasia.smarthire.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final SmartHireMapper mapper;

    @PostMapping
    public UserDTO createUser(@RequestBody User user) {
        return mapper.toUserDTO(userService.createUser(user));
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return mapper.toUserDTO(userService.getUserById(id));
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(mapper::toUserDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@RequestBody User user, @PathVariable Long id) {
        return mapper.toUserDTO(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}