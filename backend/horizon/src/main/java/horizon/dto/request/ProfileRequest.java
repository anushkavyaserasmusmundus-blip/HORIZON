package horizon.dto.request;

import lombok.Data;

@Data
public class ProfileRequest {

    private String token; //Auth response
    private String username; //profile response
    private String email;
    private String role;
}
