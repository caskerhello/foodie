package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReplyMemberView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "replyid")
    private int replyid;
    private int postid;
    private String reply_content;
    @CreationTimestamp
    private Timestamp writedate;
    private int memberid;
    private String nickname;
    private String email;
    private String member_phone;
    private String profileimg;
    private String profilemsg;
    private String snsid;
    private String provider;
    private String zipnum;
    private String address;
}
