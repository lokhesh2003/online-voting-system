package com.voting.backend.controller;

import com.voting.backend.model.User;
import com.voting.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    UserRepository userRepo;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        user.setRole("USER");
        user.setHasVoted(false);
        return userRepo.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user){
        User u = userRepo.findByEmail(user.getEmail());
        if(u != null && u.getPassword().equals(user.getPassword())){
            return u;
        }
        throw new RuntimeException("Invalid credentials");
    }
}
