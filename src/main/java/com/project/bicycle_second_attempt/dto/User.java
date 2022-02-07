package com.project.bicycle_second_attempt.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("users")
public class User{
 

    private String userid;
    // private String email;
    private String password;
    private String username;
    private String phoneNum;
    private String road;
    private String jibeon;
    private String detail_ad;
    private String email;
    private String email2;

    private String joinAt;


}