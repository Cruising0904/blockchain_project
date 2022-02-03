package com.project.bicycle_second_attempt.dto;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("users")
public class User{

   
    public String _id;
    // public String email;
    public String phoneNum;
    public String password;


}