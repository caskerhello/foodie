package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "placeid")
    private int placeid;
    private int reviewamount;
    private double avestars;
    private int kakaoplaceid;
    private int category;
    private String placeName;
    private String roadAddress;
    private String phone;
    private String placeUrl;
    private double x;
    private double y;
}
