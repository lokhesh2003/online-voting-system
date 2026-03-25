package com.voting.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String party;
    private int votes;

    private String tc;
    private String city;
    private String mobileNo;
    private String email;
    @jakarta.persistence.Lob
    @jakarta.persistence.Column(columnDefinition="LONGTEXT")
    private String photoBase64;


    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getParty() { return party; }
    public void setParty(String party) { this.party = party; }
    public int getVotes() { return votes; }
    public void setVotes(int votes) { this.votes = votes; }
    public String getTc() { return tc; }
    public void setTc(String tc) { this.tc = tc; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getMobileNo() { return mobileNo; }
    public void setMobileNo(String mobileNo) { this.mobileNo = mobileNo; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhotoBase64() { return photoBase64; }
    public void setPhotoBase64(String photoBase64) { this.photoBase64 = photoBase64; }
}
