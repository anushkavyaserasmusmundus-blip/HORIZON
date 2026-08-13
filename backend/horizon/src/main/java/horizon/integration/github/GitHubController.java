package horizon.integration.github;

import horizon.entity.Profile;
import horizon.entity.User;
import horizon.repository.ProfileRepository;
import horizon.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/integrations/github")
public class GitHubController {

    private final GitHubService gitHubService;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public GitHubController(
            GitHubService gitHubService,
            ProfileRepository profileRepository,
            UserRepository userRepository
    ) {
        this.gitHubService = gitHubService;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Object getGitHubData(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository
                .findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        String username = profile.getGithubUsername();

        if (username == null || username.isBlank()) {
            throw new RuntimeException("GitHub username not configured");
        }

        return gitHubService.getUser(username);
    }

    @GetMapping("/contributions")
    public Object getGitHubContributions(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository
                .findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        String username = profile.getGithubUsername();

        if (username == null || username.isBlank()) {
            throw new RuntimeException("GitHub username not configured");
        }

        return gitHubService.getContributions(username);
    }
}