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
            /* 모임 저장 */
            meeting.setMember(member.get());
            Meeting newMeeting = meetingRepo.save(meeting); // meeting 생성
            /* 모임 참여자 저장 */
            Participants newParticipant = new Participants();
            newParticipant.setMeetingId(newMeeting.getMeetingId()); // 모임 정보 저장
            newParticipant.setMember(member.get());
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

    /* 모임 삭제 */
    public void deleteMeeting(int meetingId) {
        Optional<Meeting> meeting = meetingRepo.findById(meetingId);
        if(meeting.isPresent()) {
            List<Participants> participants = participantsRepo.findByMeetingId(meetingId);
            participantsRepo.deleteAll(participants); // 해당 모임의 모든 참여자 삭제
            meetingRepo.delete(meeting.get()); // 모임 삭제
        }
    }
}
