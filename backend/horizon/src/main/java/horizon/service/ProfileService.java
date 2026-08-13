package horizon.service;

import horizon.dto.request.ProfileUpdateRequest;
import horizon.dto.response.ProfileResponse;
import horizon.entity.Profile;
import horizon.entity.User;
import horizon.repository.ProfileRepository;
import horizon.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(
            ProfileRepository profileRepository,
            UserRepository userRepository
    ) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
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
                profile.getLinkedin(),
                profile.getLocation()
        );
    }
}