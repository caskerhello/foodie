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
    private String place_name;
    private String road_address_name;
    private String phone;
    private String place_url;
    private double x;
    private double y;
}
