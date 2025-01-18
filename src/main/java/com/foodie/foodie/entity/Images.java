package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imagesid")
    private int imagesid;
    private int postid;
    private String savefilename;
}