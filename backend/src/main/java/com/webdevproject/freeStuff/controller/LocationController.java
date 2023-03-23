package com.webdevproject.freeStuff.controller;

import com.webdevproject.freeStuff.model.Location;
import com.webdevproject.freeStuff.repository.LocationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/locations")
public class LocationController {
    Logger logger = LoggerFactory.getLogger(LocationController.class);

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable String id) {
        Optional<Location> location = locationRepository.findById(id);
        return location.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        try {
            Location savedLocation = locationRepository.save(location);
            logger.info("New location created with id: {}", savedLocation.getId());
            return ResponseEntity.ok(savedLocation);
        } catch (Exception e) {
            logger.error("Error occurred while creating location", e);
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}/setUnavailable")
    public ResponseEntity<Location> setLocationUnavailable(@PathVariable String id) {
        Optional<Location> optionalLocation = locationRepository.findById(id);
        if (optionalLocation.isEmpty()) {
            logger.warn("Location with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        Location location = optionalLocation.get();
        location.setAvailable(false);

        try {
            Location updatedLocation = locationRepository.save(location);
            logger.info("Location with id {} marked as unavailable", updatedLocation.getId());
            return ResponseEntity.ok(updatedLocation);
        } catch (Exception e) {
            logger.error("Error occurred while setting location unavailable", e);
            return ResponseEntity.status(500).build();
        }
    }
}
