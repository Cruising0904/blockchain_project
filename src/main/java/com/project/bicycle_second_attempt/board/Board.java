package com.project.bicycle_second_attempt.board;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document("events")
@Getter
@Setter
public class Board {
    
    @Id
    private String _id;

    private String title;

    // private String 

}
