package com.project.bicycle_second_attempt.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("users")
public class User{
 
    @Id
    public String id;
    // public String email;
    public String phoneNum;
    public String password;
    private String joinAt;


}