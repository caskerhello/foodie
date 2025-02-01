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
    public HashMap<String, Object> createMeeting(@RequestBody Meeting meeting, @RequestParam("email") String email) {
        HashMap<String, Object> result = new HashMap<>();
        System.out.println(meeting);
        System.out.println(email);
        ms.createMeeting(meeting, email);
        result.put("msg", "yes");
        return result;
    }

}
