package com.foodie.foodie.dto;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Getter
public class PostMemberDTO {
    private int postid;
    private String post_content;
    @CreationTimestamp
    private Timestamp writedate;
    private int stars;
    private int placeid;

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
