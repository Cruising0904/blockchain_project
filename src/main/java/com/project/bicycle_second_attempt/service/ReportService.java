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
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    @Autowired
    private MongoTemplate mongoTemplate;
    Date date = Calendar.getInstance().getTime();
    DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
    String now = dateFormat.format(date);

    public List<Board> getBoards(){
        // System.out.println("getBoards!");

        List<Board> result = new ArrayList<>();
        result = mongoTemplate.findAll(Board.class);
        // for (int i = 0; i < result.size(); i++) {
        //     System.out.println(result.get(i));
        // }
        return result;
    }
}
