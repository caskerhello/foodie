package com.foodie.foodie.service;

import com.foodie.foodie.entity.Meeting;
import com.foodie.foodie.entity.Participants;
import com.foodie.foodie.repository.MeetingRepository;
import com.foodie.foodie.repository.ParticipantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MeetingService {
    @Autowired
    MeetingRepository mr;
    @Autowired
    ParticipantsRepository pr;

    /* 모임 생성 */
    public void createMeeting(Meeting meeting, String email) {
        Meeting newMeeting = mr.save(meeting); // meeting 생성
        Participants newParticipant = new Participants();
        newParticipant.setMeetingId(newMeeting.getMeetingId());
        newParticipant.setEmail(email); // 현재 유저 정보 담기
        pr.save(newParticipant); // participant 생성
    }
}
