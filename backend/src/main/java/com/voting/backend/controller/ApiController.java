package com.voting.backend.controller;

import com.voting.backend.model.Candidate;
import com.voting.backend.model.User;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ApiController {

    @Autowired
    CandidateRepository candidateRepo;

    @Autowired
    UserRepository userRepo;

    // --- CANDIDATES DATA (VIEW IN BROWSER) ---
    @GetMapping("/candidates")
    public List<Candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }

    @GetMapping("/candidates/{id}")
    public Candidate getCandidateById(@PathVariable Long id) {
        return candidateRepo.findById(id).orElse(null);
    }

    // --- VOTERS DATA (VIEW IN BROWSER) ---
    @GetMapping("/voters")
    public List<User> getAllVoters() {
        return userRepo.findAll().stream()
                .filter(u -> "USER".equals(u.getRole()))
                .collect(Collectors.toList());
    }

    @GetMapping("/voters/{id}")
    public User getVoterById(@PathVariable Long id) {
        return userRepo.findById(id).orElse(null);
    }

    // --- ADMINS DATA (VIEW IN BROWSER) ---
    @GetMapping("/admins")
    public List<User> getAllAdmins() {
        return userRepo.findAll().stream()
                .filter(u -> "ADMIN".equals(u.getRole()))
                .collect(Collectors.toList());
    }

    @GetMapping("/admins/{id}")
    public User getAdminById(@PathVariable Long id) {
        User user = userRepo.findById(id).orElse(null);
        if (user != null && "ADMIN".equals(user.getRole())) {
            return user;
        }
        return null;
    }

    // --- ALL USERS DATA (VIEW IN BROWSER) ---
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepo.findById(id).orElse(null);
    }

    // --- SUMMARY STATS (VIEW IN BROWSER) ---
    @GetMapping("/dashboard-summary")
    public java.util.Map<String, Object> getDashboardSummary() {
        java.util.Map<String, Object> summary = new java.util.HashMap<>();

        List<User> allUsers = userRepo.findAll();
        List<Candidate> allCandidates = candidateRepo.findAll();

        long votersCount = allUsers.stream().filter(u -> "USER".equals(u.getRole())).count();
        long adminsCount = allUsers.stream().filter(u -> "ADMIN".equals(u.getRole())).count();
        long votedCount = allUsers.stream().filter(User::isHasVoted).count();
        long candidatesCount = allCandidates.size();
        long totalVotes = allCandidates.stream().mapToInt(Candidate::getVotes).sum();

        summary.put("totalVoters", votersCount);
        summary.put("totalAdmins", adminsCount);
        summary.put("totalCandidates", candidatesCount);
        summary.put("peopleVoted", votedCount);
        summary.put("totalVotes", totalVotes);
        summary.put("voteParticipation",
                votersCount == 0 ? 0 : String.format("%.2f%%", ((double) votedCount / votersCount) * 100));

        return summary;
    }
}
