package horizon.controller;

import horizon.dto.response.UserResponse;
import horizon.entity.User;
import horizon.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> getUsers() {
       //hashing the password
        return userService.getAllUsers()
                .stream()
                .map(user -> {
                    UserResponse response = new UserResponse();

                    response.setId(user.getId());
                    response.setUsername(user.getUsername());
                    response.setEmail(user.getEmail());
                    response.setRole(user.getRole());

                    return response;
                })
                .toList();
    }
}