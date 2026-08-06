package horizon.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

//JPA - Java Persistence API is a specification for managing relational data in Java applications.
//  It provides a way to map Java objects to database tables and vice versa, allowing developers to work with databases using object-oriented programming concepts.

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name")
    private String fullName;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String designation;

    @Column(name = "profile_photo")
    private String profilePhoto;

    @Column(name = "github_username")
    private String githubUsername;

    @Column(name = "leetcode_username")
    private String leetcodeUsername;

    private String linkedin;

    private String location;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne //relationship with User entity
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    public Profile() {
    }

    @PrePersist // Set createdAt and updatedAt before persisting
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters

    public UUID getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getBio() {
        return bio;
    }

    public String getDesignation() {
        return designation;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public String getGithubUsername() {
        return githubUsername;
    }

    public String getLeetcodeUsername() {
        return leetcodeUsername;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public String getLocation() {
        return location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public User getUser() {
        return user;
    }

    // Setters

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public void setGithubUsername(String githubUsername) {
        this.githubUsername = githubUsername;
    }

    public void setLeetcodeUsername(String leetcodeUsername) {
        this.leetcodeUsername = leetcodeUsername;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setUser(User user) {
        this.user = user;
    }
}