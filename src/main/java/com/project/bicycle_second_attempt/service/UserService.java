package com.project.bicycle_second_attempt.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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
    Date date = Calendar.getInstance().getTime();  
    DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
    String now = dateFormat.format(date);  

    public User insetUser(String id, String password) {
        User user = new User();
        user.setId(id);
        user.setPassword(password);
        user.setJoinAt(now);
        System.out.println("insertUser");
        return mongoTemplate.insert(user);
    }

    public List<User> findUser(String id, String password) {
        List<User> result = new ArrayList<>();
        Query query = new Query().addCriteria(Criteria.where("id").is(id));
        result = mongoTemplate.find(query, User.class);
        
        return result;
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
