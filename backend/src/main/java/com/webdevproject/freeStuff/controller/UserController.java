package com.webdevproject.freeStuff.controller;

import com.webdevproject.freeStuff.model.User;
import com.webdevproject.freeStuff.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            logger.error("Email already exists");
            return ResponseEntity.badRequest().body("Email already exists");
        }
        userRepository.save(user);

        logger.info("User registered successfully");
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(user.getPassword())) {
            logger.info("User logged in successfully");
            return ResponseEntity.ok("User logged in successfully");
        }

        logger.error("Invalid email or password");
        return ResponseEntity.badRequest().body("Invalid email or password");
    }
}