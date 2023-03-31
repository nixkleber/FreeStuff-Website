package com.webdevproject.freeStuff.controller;

import com.webdevproject.freeStuff.model.Location;
import com.webdevproject.freeStuff.model.User;
import com.webdevproject.freeStuff.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<String> getUsernameByEmail(@RequestParam String email) {
        Optional<String> optionalUsername = userRepository.findUsernameByEmail(email);
        if (optionalUsername.isPresent()) {
            logger.info("Username retrieved successfully");
            logger.info(optionalUsername.get());
            return ResponseEntity.ok(optionalUsername.get());
        }

        logger.error("User not found");
        return ResponseEntity.notFound().build();
    }

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

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User user) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            userRepository.save(existingUser);
            logger.info("User updated successfully");
            return ResponseEntity.ok("User updated successfully");
        }

        logger.error("User not found");
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUserPassword(@PathVariable String id, @RequestBody String password) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setPassword(password);
            userRepository.save(existingUser);
            logger.info("User password updated successfully");
            return ResponseEntity.ok("User password updated successfully");
        }

        logger.error("User not found");
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.delete(optionalUser.get());
            logger.info("User deleted successfully");
            return ResponseEntity.ok("User deleted successfully");
        }

        logger.error("User not found");
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
}