package com.voting.backend.controller;

import com.voting.backend.model.Candidate;
import com.voting.backend.model.User;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vote")
@CrossOrigin("*")
public class VoteController {

    @Autowired
    CandidateRepository candidateRepo;

    @Autowired
    UserRepository userRepo;

    @GetMapping("/candidates")
    public List<Candidate> getAll(){
        return candidateRepo.findAll();
    }

    @PostMapping("/{userId}/{candidateId}")
    public String vote(@PathVariable Long userId, @PathVariable Long candidateId){

        User user = userRepo.findById(userId).get();

        if(user.isHasVoted()){
            return "Already Voted!";
        }

        Candidate c = candidateRepo.findById(candidateId).get();
        c.setVotes(c.getVotes()+1);

        user.setHasVoted(true);
        user.setVoteDate(java.time.LocalDate.now());

        candidateRepo.save(c);
        userRepo.save(user);

        return "Vote Submitted!";
    }
}
