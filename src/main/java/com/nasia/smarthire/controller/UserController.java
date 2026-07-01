package com.nasia.smarthire.controller;

import com.nasia.smarthire.model.User;
import com.nasia.smarthire.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping
    public User createUser (@RequestBody User user){
        return userService.createUser(user);
    }
    @GetMapping("/{id}")
    public User getUserById (@PathVariable Long id){
        return userService.getUserById(id);
    }
    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @PutMapping("/{id}")
    public User updateUser (@RequestBody User user , @PathVariable Long id){
        return userService.updateUser(id , user);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

}
