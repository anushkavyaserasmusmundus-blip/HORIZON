package horizon.integration.codeforces;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class CodeforcesService {

    private final RestTemplate restTemplate;

    public CodeforcesService() {
        this.restTemplate = new RestTemplate();
    }

    public Object getUser(String username) {

        String url = "https://codeforces.com/api/user.info?handles=" + username;

        return restTemplate.getForObject(url, Object.class);
    }

    public Object getSubmissions(String username) {

        String url = "https://codeforces.com/api/user.status?handle=" + username;

        return restTemplate.getForObject(url, Object.class);
    }

    public CodeforcesStatsResponse getStats(String username) {

        String url =
                "https://codeforces.com/api/user.status?handle=" + username;

        Map<String, Object> response =
                restTemplate.getForObject(url, Map.class);

        List<Map<String, Object>> submissions =
                (List<Map<String, Object>>) response.get("result");

        int totalSubmissions = submissions.size();
        int acceptedSubmissions = 0;

        Set<String> solvedProblems = new HashSet<>();

        for (Map<String, Object> submission : submissions) {

            String verdict = (String) submission.get("verdict");

            if ("OK".equals(verdict)) {

                acceptedSubmissions++;

                Map<String, Object> problem =
                        (Map<String, Object>) submission.get("problem");

                String contestId =
                        String.valueOf(submission.get("contestId"));

                String index =
                        (String) problem.get("index");

                solvedProblems.add(contestId + "-" + index);
            }
        }

        return new CodeforcesStatsResponse(
                totalSubmissions,
                acceptedSubmissions,
                solvedProblems.size()
        );
    }
}