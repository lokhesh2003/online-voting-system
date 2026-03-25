package com.voting.backend.controller;

import com.voting.backend.model.Candidate;
import com.voting.backend.model.User;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.UserRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    CandidateRepository candidateRepo;

    // --- DASHBOARD STATS ---
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        List<User> users = userRepo.findAll();
        long votersCount = users.stream().filter(u -> "USER".equals(u.getRole())).count();
        stats.put("totalVoters", votersCount);
        
        List<Candidate> candidates = candidateRepo.findAll();
        stats.put("totalCandidates", candidates.size());
        
        long totalVotes = candidates.stream().mapToInt(Candidate::getVotes).sum();
        stats.put("totalVotes", totalVotes);
        
        return stats;
    }

    // --- VOTERS CRUD ---
    @GetMapping("/voters")
    public List<User> getVoters() {
        return userRepo.findAll().stream()
                .filter(u -> "USER".equals(u.getRole()))
                .collect(Collectors.toList());
    }

    @PostMapping("/voters")
    public User addVoter(@RequestBody User user) {
        user.setRole("USER");
        if(user.getPassword() == null) user.setPassword("1234");
        return userRepo.save(user);
    }

    @PutMapping("/voters/{id}")
    public User updateVoter(@PathVariable Long id, @RequestBody User userDetails) {
        User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("Voter not found"));
        u.setName(userDetails.getName());
        u.setEmail(userDetails.getEmail());
        if(userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()){
            u.setPassword(userDetails.getPassword());
        }
        return userRepo.save(u);
    }

    @DeleteMapping("/voters/{id}")
    public String deleteVoter(@PathVariable Long id) {
        if(userRepo.existsById(id)) {
            userRepo.deleteById(id);
            return "Voter removed successfully.";
        }
        return "Voter not found.";
    }

    // --- RESULTS STATS ---
    @GetMapping("/results-stats")
    public Map<String, Object> getResultsStats() {
        Map<String, Object> stats = new HashMap<>();
        
        List<User> users = userRepo.findAll();
        long votersCount = users.stream().filter(u -> "USER".equals(u.getRole())).count();
        long votedCount = users.stream().filter(User::isHasVoted).count();
        
        List<Candidate> candidates = candidateRepo.findAll();
        
        double participation = votersCount == 0 ? 0 : ((double)votedCount / votersCount) * 100;
        
        Map<String, Long> votesByDate = users.stream()
            .filter(u -> u.isHasVoted() && u.getVoteDate() != null)
            .collect(Collectors.groupingBy(u -> u.getVoteDate().toString(), Collectors.counting()));
            
        Candidate winner = null;
        if (!candidates.isEmpty()) {
            winner = candidates.stream().max(java.util.Comparator.comparingInt(Candidate::getVotes)).orElse(null);
        }
        
        if (winner != null && winner.getVotes() > 0) {
            stats.put("winnerName", winner.getName());
            stats.put("winnerVotes", winner.getVotes());
        } else {
            stats.put("winnerName", "No votes yet");
            stats.put("winnerVotes", 0);
        }

        stats.put("participation", String.format("%.0f", participation));
        stats.put("totalVoters", votersCount);
        stats.put("votedCount", votedCount);
        stats.put("totalCandidates", candidates.size());
        stats.put("votesByDate", votesByDate);
        return stats;
    }

    // --- CANDIDATES CRUD ---

    @PostMapping("/candidates")
    public Candidate addCandidate(@RequestBody Candidate candidate) {
        if(candidate.getVotes() < 0) {
            candidate.setVotes(0); // initialize properly
        }
        return candidateRepo.save(candidate);
    }

    @PutMapping("/candidates/{id}")
    public Candidate updateCandidate(@PathVariable Long id, @RequestBody Candidate candidateDetails) {
        Candidate c = candidateRepo.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
        c.setName(candidateDetails.getName());
        c.setParty(candidateDetails.getParty());
        c.setTc(candidateDetails.getTc());
        c.setCity(candidateDetails.getCity());
        c.setMobileNo(candidateDetails.getMobileNo());
        c.setEmail(candidateDetails.getEmail());
        if (candidateDetails.getPhotoBase64() != null) {
            c.setPhotoBase64(candidateDetails.getPhotoBase64());
        }
        return candidateRepo.save(c);
    }

    @DeleteMapping("/candidates/{id}")
    public String deleteCandidate(@PathVariable Long id) {
        if(candidateRepo.existsById(id)) {
            candidateRepo.deleteById(id);
            return "Candidate removed successfully.";
        }
        return "Candidate not found.";
    }
}
