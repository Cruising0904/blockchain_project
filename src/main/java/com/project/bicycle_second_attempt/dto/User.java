package com.project.bicycle_second_attempt.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collation = "users")
public class User{

    @Id
    private String id;
    private String email;
    private String phoneNum;
    private String password;
}