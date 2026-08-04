package horizon.controller;

import horizon.dto.request.RegisterRequest;
import horizon.dto.response.UserResponse;
//import horizon.entity.User;
import horizon.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
}