package com.project.bicycle_second_attempt.repository;

import java.util.List;

import com.project.bicycle_second_attempt.dto.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String>{
    // @Query("{id :?0}") //SQL Equivalent : SELECT * FROM BOOK WHERE ID=?
    // Optional<Book> getBookById(Integer id);

    List<User> findByPhoneNum(String phoneNum);
    // List<User> findAll();   
    
}
