package com.foodie.foodie.service;

import com.foodie.foodie.entity.Meeting;
import com.foodie.foodie.entity.Member;
import com.foodie.foodie.entity.Participants;
import com.foodie.foodie.repository.MeetingRepository;
import com.foodie.foodie.repository.MemberRepository;
import com.foodie.foodie.repository.ParticipantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MeetingService {
    @Autowired
    MemberRepository memberRepo;
    @Autowired
    MeetingRepository meetingRepo;
    @Autowired
    ParticipantsRepository participantsRepo;

    /* 모임 생성 */
    public void createMeeting(Meeting meeting, int memberId) {
        Optional<Member> member = memberRepo.findByMemberid(memberId);
        if(member.isPresent()) {
            meeting.setMember(member.get());
            Meeting newMeeting = meetingRepo.save(meeting); // meeting 생성

            Participants newParticipant = new Participants();
            newParticipant.setMeetingId(newMeeting.getMeetingId());
            newParticipant.setMember(member.get());
            newParticipant.setMemberId(memberId); // 현재 유저 정보 담기
            participantsRepo.save(newParticipant); // participant 생성
        }
    }

    /* 모임 리스트 조회 */
    public List<Meeting> getMeeting() {
        return meetingRepo.findAll();
    }

    /* 모임 참여자 리스트 조회 */
    public List<Participants> getParticipants() {
        return participantsRepo.findAll();
    }
}
