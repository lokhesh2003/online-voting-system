package com.voting.backend.controller;

import com.voting.backend.model.Candidate;
import com.voting.backend.model.User;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class RootApiController {

    @Autowired
    CandidateRepository candidateRepo;

    @Autowired
    UserRepository userRepo;

    @GetMapping("/candidates")
    public List<Candidate> candidates() {
        return candidateRepo.findAll();
    }

    @GetMapping("/candidates/{id}")
    public Candidate candidateById(@PathVariable Long id) {
        return candidateRepo.findById(id).orElse(null);
    }

    @GetMapping("/voters")
    public List<User> voters() {
        return userRepo.findAll().stream()
                .filter(u -> "USER".equals(u.getRole()))
                .collect(Collectors.toList());
    }

    @GetMapping("/voters/{id}")
    public User voterById(@PathVariable Long id) {
        User user = userRepo.findById(id).orElse(null);
        if (user != null && "USER".equals(user.getRole())) {
            return user;
        }
        return null;
    }

}
