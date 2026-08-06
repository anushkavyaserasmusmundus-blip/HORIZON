package horizon.service;

import horizon.entity.Profile;
import horizon.entity.User;
import horizon.repository.ProfileRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }


    public Profile getCurrentUserProfile() {

        User user = getCurrentUser();

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Profile not found")
                );

        return profile;
    }


    private User getCurrentUser() {

        Object principal =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return (User) principal;
    }
}