package com.project.bicycle_second_attempt.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.project.bicycle_second_attempt.dto.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {
    @Autowired
    private MongoTemplate mongoTemplate;
    Date date = Calendar.getInstance().getTime();
    DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
    String now = dateFormat.format(date);

    public List<Board> getNotice(){
        List<Board> result = new ArrayList<>();
        Query query = new Query().addCriteria(Criteria.where("isNotice").is(true));
        result = mongoTemplate.find(query, Board.class);
        // System.out.println("getBoards!");
        // System.out.println(result);
        // for (int i = 0; i < result.size(); i++) {
        //     System.out.println(result.get(i));
        // }
        return result;
    }
}
