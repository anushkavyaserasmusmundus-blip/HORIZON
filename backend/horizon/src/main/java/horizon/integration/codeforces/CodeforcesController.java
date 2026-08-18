package horizon.integration.codeforces;

import horizon.entity.Profile;
import horizon.entity.User;
import horizon.repository.ProfileRepository;
import horizon.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/integrations/codeforces")
public class CodeforcesController {

    private final CodeforcesService codeforcesService;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public CodeforcesController(
            CodeforcesService codeforcesService,
            ProfileRepository profileRepository,
            UserRepository userRepository
    ) {
        this.codeforcesService = codeforcesService;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Object getCodeforcesData(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository
                .findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        String username = profile.getCodeforcesUsername();

        if (username == null || username.isBlank()) {
            throw new RuntimeException("Codeforces username not configured");
        }

        return codeforcesService.getUser(username);
    }

    @GetMapping("/submissions")
    public Object getSubmissions(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository
                .findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        String username = profile.getCodeforcesUsername();

        if (username == null || username.isBlank()) {
            throw new RuntimeException("Codeforces username not configured");
        }

        return codeforcesService.getSubmissions(username);
    }

    @GetMapping("/stats")
public CodeforcesStatsResponse getStats(Authentication authentication) {

    User user = userRepository
            .findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));

    Profile profile = profileRepository
            .findByUser(user)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

    String username = profile.getCodeforcesUsername();

    if (username == null || username.isBlank()) {
        throw new RuntimeException("Codeforces username not configured");
    }

    return codeforcesService.getStats(username);
}
}