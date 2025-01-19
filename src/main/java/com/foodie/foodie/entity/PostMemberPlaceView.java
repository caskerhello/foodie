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
public class PostMemberPlaceView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postid")
    private int postid;
    private String post_content;
    @CreationTimestamp
    private Timestamp post_write_date;
    private int post_stars;

    private int memberid;
    private String nickname;
    private String email;
    private String member_phone;
    private String profileimg;
    private String profilemsg;
    private String snsid;
    private String provider;
    private String zipnum;
    private String member_address;

    private int placeid;
    private int reviewamount;
    private double place_ave_stars;
    private int kakaoplaceid;
    private int category;
    private String place_name;
    private String road_address_name;
    private String place_phone;
    private String place_url;
    private double place_x;
    private double place_y;
}
