package horizon.integration.github;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GitHubService {

    private final RestTemplate restTemplate;

    @Value("${github.token}")
    private String githubToken;

    public GitHubService() {
        this.restTemplate = new RestTemplate();
    }

    public Object getUser(String username) {

        String url = "https://api.github.com/users/" + username;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Object> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Object.class
        );

        return response.getBody();
    }

    public Object getContributions(String username) {

        String query = """
                query {
                  user(login: "%s") {
                    contributionsCollection {
                      contributionCalendar {
                        totalContributions
                        weeks {
                          contributionDays {
                            date
                            contributionCount
                          }
                        }
                      }
                    }
                  }
                }
                """.formatted(username);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Content-Type", "application/json");

        Map<String, String> body = Map.of("query", query);

        HttpEntity<Map<String, String>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Object> response = restTemplate.exchange(
                "https://api.github.com/graphql",
                HttpMethod.POST,
                entity,
                Object.class
        );

        return response.getBody();
    }
}