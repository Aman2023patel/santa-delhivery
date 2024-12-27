package com.Santa.Logistics.Services;

import com.Santa.Logistics.Entities.User;
import com.Santa.Logistics.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public User registerUser(User user) {
        return userRepository.save(user); // Save new user
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    public void updateOrderCount(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setOrderCount(user.getOrderCount() + 1); // Increment the order count
        userRepository.save(user); // Save the updated user
    }

    public int getOrderCount(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getOrderCount(); // Return the order count
    }


}
