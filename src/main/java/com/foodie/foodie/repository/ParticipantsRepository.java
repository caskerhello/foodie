package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Participants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Integer> {

    List<Participants> findByMeetingId(int meetingId);
    Optional<Participants> findByMeetingIdAndMember_Memberid(int meetingId, int memberId);
}
