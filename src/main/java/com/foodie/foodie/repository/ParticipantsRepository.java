package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Participants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantsRepository extends JpaRepository<Participants, Integer> {

    List<Participants> findByMeetingId(int meetingId);
}
