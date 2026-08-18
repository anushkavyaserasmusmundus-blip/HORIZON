package horizon.dto.response;

import java.util.List;
import java.util.Map;

public class ProfileResponse {

    private String username;
    private String email;
    private String role;
    private String fullName;
    private String bio;
    private String designation;
    private String profilePhoto;
    private String githubUsername;
    private String leetcodeUsername;
    private String codeforcesUsername;
    private String linkedin;
    private String location;
    private String currentCompany;
    private Integer yearsOfExperience;
    private String availabilityStatus;
    private String primaryFocus;
    private List<Map<String, Object>> skills;
    private List<Map<String, Object>> experience;
    private List<Map<String, Object>> education;
    private List<Map<String, Object>> certifications;
    private List<Map<String, Object>> projects;

    public ProfileResponse(
            String username,
            String email,
            String role,
            String fullName,
            String bio,
            String designation,
            String profilePhoto,
            String githubUsername,
            String leetcodeUsername,
            String codeforcesUsername,
            String linkedin,
            String location,
            String currentCompany,
            Integer yearsOfExperience,
            String availabilityStatus,
            String primaryFocus,
            List<Map<String, Object>> skills,
            List<Map<String, Object>> experience,
            List<Map<String, Object>> education,
            List<Map<String, Object>> certifications,
            List<Map<String, Object>> projects
    ) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.bio = bio;
        this.designation = designation;
        this.profilePhoto = profilePhoto;
        this.githubUsername = githubUsername;
        this.leetcodeUsername = leetcodeUsername;
        this.codeforcesUsername = codeforcesUsername;
        this.linkedin = linkedin;
        this.location = location;
        this.currentCompany = currentCompany;
        this.yearsOfExperience = yearsOfExperience;
        this.availabilityStatus = availabilityStatus;
        this.primaryFocus = primaryFocus;
        this.skills = skills;
        this.experience = experience;
        this.education = education;
        this.certifications = certifications;
        this.projects = projects;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
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

    public String getCodeforcesUsername() {
        return codeforcesUsername;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public String getLocation() {
        return location;
    }

    public String getCurrentCompany() { return currentCompany; }
    public Integer getYearsOfExperience() { return yearsOfExperience; }
    public String getAvailabilityStatus() { return availabilityStatus; }
    public String getPrimaryFocus() { return primaryFocus; }
    public List<Map<String, Object>> getSkills() { return skills; }
    public List<Map<String, Object>> getExperience() { return experience; }
    public List<Map<String, Object>> getEducation() { return education; }
    public List<Map<String, Object>> getCertifications() { return certifications; }
    public List<Map<String, Object>> getProjects() { return projects; }
}