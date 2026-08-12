package horizon.dto.response;

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
    private String linkedin;
    private String location;

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
            String linkedin,
            String location
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
        this.linkedin = linkedin;
        this.location = location;
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

    public String getLinkedin() {
        return linkedin;
    }

    public String getLocation() {
        return location;
    }
}