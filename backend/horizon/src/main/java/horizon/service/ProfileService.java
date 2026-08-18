package horizon.service;

import horizon.dto.request.ProfileUpdateRequest;
import horizon.dto.response.ProfileResponse;
import horizon.entity.Profile;
import horizon.entity.User;
import horizon.repository.ProfileRepository;
import horizon.repository.UserRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
        private final ObjectMapper objectMapper;

        public ProfileService(
                        ProfileRepository profileRepository,
                        UserRepository userRepository
        ) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
                this.objectMapper = new ObjectMapper();
    }

    public ProfileResponse getCurrentUserProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return createResponse(user, profile);
    }

    public ProfileResponse updateProfile(
            Authentication authentication,
            ProfileUpdateRequest request
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (request.getFullName() != null) {
                profile.setFullName(request.getFullName());
        }

        if (request.getGithubUsername() != null) {
                profile.setGithubUsername(request.getGithubUsername());
        }

        if (request.getLeetcodeUsername() != null) {
                profile.setLeetcodeUsername(request.getLeetcodeUsername());
        }

        if (request.getCodeforcesUsername() != null) {
                profile.setCodeforcesUsername(request.getCodeforcesUsername());
        }

        if (request.getBio() != null) profile.setBio(request.getBio());
        if (request.getDesignation() != null) profile.setDesignation(request.getDesignation());
        if (request.getProfilePhoto() != null) profile.setProfilePhoto(request.getProfilePhoto());
        if (request.getLinkedin() != null) profile.setLinkedin(request.getLinkedin());
        if (request.getLocation() != null) profile.setLocation(request.getLocation());
        if (request.getCurrentCompany() != null) profile.setCurrentCompany(request.getCurrentCompany());
        if (request.getYearsOfExperience() != null) profile.setYearsOfExperience(request.getYearsOfExperience());
        if (request.getAvailabilityStatus() != null) profile.setAvailabilityStatus(request.getAvailabilityStatus());
        if (request.getPrimaryFocus() != null) profile.setPrimaryFocus(request.getPrimaryFocus());
        if (request.getSkills() != null) profile.setSkillsJson(writeJson(request.getSkills()));
        if (request.getExperience() != null) profile.setExperienceJson(writeJson(request.getExperience()));
        if (request.getEducation() != null) profile.setEducationJson(writeJson(request.getEducation()));
        if (request.getCertifications() != null) profile.setCertificationsJson(writeJson(request.getCertifications()));
        if (request.getProjects() != null) profile.setProjectsJson(writeJson(request.getProjects()));

        Profile savedProfile = profileRepository.save(profile);

        return createResponse(user, savedProfile);
    }

    private ProfileResponse createResponse(User user, Profile profile) {

        return new ProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                profile.getFullName(),
                profile.getBio(),
                profile.getDesignation(),
                profile.getProfilePhoto(),
                profile.getGithubUsername(),
                profile.getLeetcodeUsername(),
                profile.getCodeforcesUsername(),
                profile.getLinkedin(),
                                profile.getLocation(),
                                profile.getCurrentCompany(),
                                profile.getYearsOfExperience(),
                                profile.getAvailabilityStatus(),
                                profile.getPrimaryFocus(),
                                readJson(profile.getSkillsJson()),
                                readJson(profile.getExperienceJson()),
                                readJson(profile.getEducationJson()),
                                readJson(profile.getCertificationsJson()),
                                readJson(profile.getProjectsJson())
        );
    }

        private String writeJson(Object value) {
                try {
                        return objectMapper.writeValueAsString(value);
                } catch (JsonProcessingException exception) {
                        throw new IllegalArgumentException("Invalid profile data", exception);
                }
        }

        private List<Map<String, Object>> readJson(String value) {
                if (value == null || value.isBlank()) return List.of();
                try {
                        return objectMapper.readValue(value, new TypeReference<>() {});
                } catch (JsonProcessingException exception) {
                        return List.of();
                }
        }
}