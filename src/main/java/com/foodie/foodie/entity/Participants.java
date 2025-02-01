package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Participants {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participantid")
    private int participantId;
    @Column(name = "meeting_id")
    private int meetingId;
    @Column(name = "member_email")
    private String email;
}
