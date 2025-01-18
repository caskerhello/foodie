package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postid")
    private int postid;
    private int memberid;
    private String content;
    @CreationTimestamp
    private Timestamp writedate;
    private int stars;
    private int placeid;

}
