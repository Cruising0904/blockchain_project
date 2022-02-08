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


    public void insertUser(User user){
        user.setJoinAt(now);
        mongoTemplate.insert(user);
    }

    public List<User> findUser(String userid) {
        List<User> result = new ArrayList<>();
        Query query = new Query().addCriteria(Criteria.where("userid").is(userid));
        System.out.println("query:"+query);
        result = mongoTemplate.find(query, User.class);
        
        return result;
    }

    public void findUsers() {
        // List<User> result = new ArrayList<>();
        mongoTemplate.findAll(User.class);
        // System.out.println("findUsers!");
        // for (int i = 0; i < result.size(); i++) {
        //     System.out.println(result.get(i));
        // }
    }

}
