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
    @Column(name = "member_id")
    private int memberId;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name = "memberid")
    Member member;
}
