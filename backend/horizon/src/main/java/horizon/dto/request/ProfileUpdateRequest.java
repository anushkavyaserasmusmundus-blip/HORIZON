package horizon.dto.request;

import java.util.List;
import java.util.Map;

public class ProfileUpdateRequest {

    private String fullName;
    private String githubUsername;
    private String leetcodeUsername;
    private String codeforcesUsername;
    private String bio;
    private String designation;
    private String profilePhoto;
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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGithubUsername() {
        return githubUsername;
    }

    public void setGithubUsername(String githubUsername) {
        this.githubUsername = githubUsername;
    }

    public String getLeetcodeUsername() {
        return leetcodeUsername;
    }

    public void setLeetcodeUsername(String leetcodeUsername) {
        this.leetcodeUsername = leetcodeUsername;
    }

    public String getCodeforcesUsername() {
        return codeforcesUsername;
    }

    public void setCodeforcesUsername(String codeforcesUsername) {
        this.codeforcesUsername = codeforcesUsername;
    }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getProfilePhoto() { return profilePhoto; }
    public void setProfilePhoto(String profilePhoto) { this.profilePhoto = profilePhoto; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getCurrentCompany() { return currentCompany; }
    public void setCurrentCompany(String currentCompany) { this.currentCompany = currentCompany; }
    public Integer getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(Integer yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }
    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public String getPrimaryFocus() { return primaryFocus; }
    public void setPrimaryFocus(String primaryFocus) { this.primaryFocus = primaryFocus; }
    public List<Map<String, Object>> getSkills() { return skills; }
    public void setSkills(List<Map<String, Object>> skills) { this.skills = skills; }
    public List<Map<String, Object>> getExperience() { return experience; }
    public void setExperience(List<Map<String, Object>> experience) { this.experience = experience; }
    public List<Map<String, Object>> getEducation() { return education; }
    public void setEducation(List<Map<String, Object>> education) { this.education = education; }
    public List<Map<String, Object>> getCertifications() { return certifications; }
    public void setCertifications(List<Map<String, Object>> certifications) { this.certifications = certifications; }
    public List<Map<String, Object>> getProjects() { return projects; }
    public void setProjects(List<Map<String, Object>> projects) { this.projects = projects; }
}