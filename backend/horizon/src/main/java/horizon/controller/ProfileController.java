package horizon.controller;

import horizon.dto.request.ProfileUpdateRequest;
import horizon.dto.response.ProfileResponse;
import horizon.service.ProfileService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse getProfile(Authentication authentication) {
        return profileService.getCurrentUserProfile(authentication);
    }

    @PutMapping
    public ProfileResponse updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateRequest request
    ) {
        return profileService.updateProfile(authentication, request);
    }
}