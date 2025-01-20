package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberid")
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
