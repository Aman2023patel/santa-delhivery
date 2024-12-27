package com.Santa.Logistics.Controllers;

import com.Santa.Logistics.Entities.User;
import com.Santa.Logistics.Repository.UserRepository;
import com.Santa.Logistics.Services.UserService;
import com.Santa.Logistics.dtos.UpdateOrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/check-username/{username}")
    public ResponseEntity<Boolean> checkUsernameAvailability(@PathVariable String username) {
        boolean isAvailable = userService.isUsernameAvailable(username);
//        return ResponseEntity.ok(isAvailable);
        if(isAvailable){
            return ResponseEntity.ok(true);
        }else{
            return ResponseEntity.status(HttpStatus.FOUND).body(false);
        }
    }

    // Removed the duplicate method
    @PostMapping("/register")
    public ResponseEntity<Boolean> registerUser(@RequestBody User user) {
        // Check if the username already exists
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }

        // Check if the email already exists
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }

        // Save the user to the database if no duplicates were found
        userService.saveUser(user);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody User user) {
        User existingUser = userService.getUserByUsername(user.getUsername());

        // Check if user exists and the password matches
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }

    @PostMapping("/updateOrderCount")
    public ResponseEntity<Boolean> updateOrderCount(@RequestBody UpdateOrderRequest request) {
        try {
            userService.updateOrderCount(request.getUserId());

            return ResponseEntity.ok(true);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }

    @GetMapping("/{userId}/orderCount")
    public ResponseEntity<Integer> getOrderCount(@PathVariable String userId) {
        try {
            int orderCount = userService.getOrderCount(userId);
            return ResponseEntity.ok(orderCount);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null); // User not found
        }
    }
}
