package com.foodie.foodie.controller;

import com.foodie.foodie.entity.Meeting;
import com.foodie.foodie.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/meeting")
public class MeetingController {
    @Autowired
    MeetingService ms;

    /* 모임 생성 */
    @PostMapping("/createMeeting")
    public HashMap<String, Object> createMeeting(@RequestBody Meeting meeting, @RequestParam("memberId") int memberId) {
        HashMap<String, Object> result = new HashMap<>();
        ms.createMeeting(meeting, memberId);
        result.put("msg", "yes");
        return result;
    }

    /* 모임 불러오기 */
    @GetMapping("/getMeeting")
    public HashMap<String, Object> getMeeting() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("meetingList", ms.getMeeting());
        result.put("participantsList", ms.getParticipants());
        return result;
    }

    /* 선택한 모임 삭제 */
    @DeleteMapping("/deleteMeeting")
    public HashMap<String, Object> deleteMeeting(@RequestParam("meetingId") int meetingId) {
        HashMap<String, Object> result = new HashMap<>();
        ms.deleteMeeting(meetingId);
        result.put("msg", "yes");
        return result;
    }

}
