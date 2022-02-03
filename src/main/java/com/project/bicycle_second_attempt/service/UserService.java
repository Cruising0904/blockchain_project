package com.project.bicycle_second_attempt.service;

import java.util.ArrayList;
import java.util.List;

import com.project.bicycle_second_attempt.dto.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private MongoTemplate mongoTemplate;

    // String id, String email,
    public User insetUser(String phoneNum, String password) {
        User user = new User();
        user.setPhoneNum(phoneNum);
        user.setPassword(password);
        System.out.println("insertUser");
        // mongoTemplate.findById("ph");
        return mongoTemplate.insert(user);
    }

    public void findUser(String phoneNum, String password) {
        User user = new User();
        user.setPhoneNum(phoneNum);
        user.setPassword(password);
        Query query = new Query().addCriteria(Criteria.where("phoneNum").is(phoneNum));
        System.out.println(mongoTemplate.find(query, User.class));

    }

    public void findUsers() {
        List<User> result = new ArrayList<>();
        result = mongoTemplate.findAll(User.class);
        System.out.println("findUsers!");
        for (int i = 0; i < result.size(); i++) {
            System.out.println(result.get(i));
        }
    }

}
