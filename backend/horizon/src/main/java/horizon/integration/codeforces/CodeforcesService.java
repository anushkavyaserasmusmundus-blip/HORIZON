package horizon.integration.codeforces;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
}