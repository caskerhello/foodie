package com.foodie.foodie.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meetingid")
    private int meetingId;
    private String title;
    private String location;
    private String organizer;
    private int maxParticipants;
    @CreationTimestamp
    private Timestamp datetime;
    private String status;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name = "meeting_id")
    Participants participants;
}
