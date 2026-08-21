package horizon.integration.leetcode;

import horizon.entity.Profile;
import horizon.entity.User;
import horizon.repository.ProfileRepository;
import horizon.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/integrations/leetcode")
public class LeetCodeController {

    private final LeetCodeService leetCodeService;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public LeetCodeController(
            LeetCodeService leetCodeService,
            ProfileRepository profileRepository,
            UserRepository userRepository
    ) {
        this.leetCodeService = leetCodeService;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Object getLeetCodeData(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository
                .findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        String username = profile.getLeetcodeUsername();
        System.out.println("LEETCODE USERNAME: [" + username + "]");
        if (username == null || username.isBlank()) {
            throw new RuntimeException("LeetCode username not configured");
        }

        return leetCodeService.getUserStats(username);
    }
}