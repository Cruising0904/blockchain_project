package com.project.bicycle_second_attempt.repository;

import com.project.bicycle_second_attempt.dto.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String>{
    
}
