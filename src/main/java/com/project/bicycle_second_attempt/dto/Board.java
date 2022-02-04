package com.project.bicycle_second_attempt.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("board")
public class Board {
    
    @Id
    private String _id;
    private String writer;
    private String title;
    private String content;
    private String time;
    private int bNum;
    private boolean isNotice;
}
