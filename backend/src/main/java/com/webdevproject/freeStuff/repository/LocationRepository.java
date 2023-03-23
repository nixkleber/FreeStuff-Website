package com.webdevproject.freeStuff.repository;

import com.webdevproject.freeStuff.model.Location;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends MongoRepository<Location, String> {
    Optional<Location> findById(String id);
    List<Location> findAll();
}
