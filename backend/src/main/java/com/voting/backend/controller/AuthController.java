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

    @GetMapping("/register")
    public String registerGet() {
        return "POST JSON to /api/auth/register {email, password, name, role(USER|ADMIN)}";
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }
        user.setHasVoted(false);
        return userRepo.save(user);
    }

    @GetMapping("/login")
    public String loginGet() {
        return "POST JSON to /api/auth/login {email, password}";
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User u = userRepo.findByEmail(user.getEmail());

        if (u == null) {
            throw new RuntimeException("Invalid credentials");
        }

        if (u.getPassword().equals(user.getPassword())) {
            if (u.getRole() == null || u.getRole().isBlank()) {
                u.setRole("USER");
            }
            return u;
        }

        throw new RuntimeException("Invalid credentials");
    }
}
