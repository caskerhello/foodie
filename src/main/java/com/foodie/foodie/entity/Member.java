package com.foodie.foodie.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberid;
    private String nickname;
    private String email;
    private String pwd;
    private String profileimg;
    private String profilemsg;
    private String snsid;
    private String provider;
    private String phone;




}
