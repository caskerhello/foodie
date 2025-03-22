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

    @Column(name = "meetingid")
    private int meetingId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberid")
    Member member;
}
