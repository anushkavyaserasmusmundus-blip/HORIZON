package horizon.integration.leetcode;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class LeetCodeService {

    private final RestTemplate restTemplate;

    public LeetCodeService() {
        this.restTemplate = new RestTemplate();
    }

    public Object getUserStats(String username) {

        String url = "https://leetcode.com/graphql/";

        String query = """
                query {
                  matchedUser(username: "%s") {
                    submitStats {
                      acSubmissionNum {
                        difficulty
                        count
                      }
                    }
                  }
                }
                """.formatted(username);

        Map<String, String> body = new HashMap<>();
        body.put("query", query);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request =
                new HttpEntity<>(body, headers);

        return restTemplate.postForObject(
                url,
                request,
                Object.class
        );
    }
}