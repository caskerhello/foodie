package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "replyid")
    private int replyid;
    private int postid;
    private int memberid;
    private String content;
    @CreationTimestamp
    private Timestamp writedate;
}
