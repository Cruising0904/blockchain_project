package com.project.bicycle_second_attempt.service;

import com.project.bicycle_second_attempt.dto.User;
import com.project.bicycle_second_attempt.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository uRepo;

    // String id, String email, 
    public User insetUser(String phoneNum, String password) {
        User user = new User();
        //  user.setId(id);
        // user.setEmail(email);
        user.setPhoneNum(phoneNum);
        user.setPassword(password);
        System.out.println("insertUser");
        // return uRepo.findById(id).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "Not found event"));
        uRepo.findById("test");
        return uRepo.save(user);
        // mt.insert(user);
        
    } 
}
