package com.webdevproject.freeStuff.repository;

import com.webdevproject.freeStuff.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    @Query(value = "{email': ?0}", fields = "{'username' : 1}")
    Optional<String> findUsernameByEmail(String email);

}
