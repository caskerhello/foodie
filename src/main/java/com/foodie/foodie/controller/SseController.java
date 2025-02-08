package com.foodie.foodie.controller;

import java.io.IOException;
import java.util.Map;

import com.foodie.foodie.util.SseEmitters;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
//@Slf4j
@RequestMapping("/sse")
public class SseController {

    private final SseEmitters sseEmitters;

    public SseController(SseEmitters sseEmitters) {
        this.sseEmitters = sseEmitters;
    }

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect() {
        SseEmitter emitter = new SseEmitter(600 * 1000L);
        sseEmitters.add(emitter);
        System.out.println("connect");

        try {
            emitter.send(SseEmitter.event()
                    .name("connect")         // 해당 이벤트의 이름 지정
                    .data("connected!"));    // 503 에러 방지를 위한 더미 데이터

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(emitter);
    }



    @PostMapping("/count")
    public ResponseEntity<Void> count() {
        System.out.println("count");
        sseEmitters.count();
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/update")
//    public ResponseEntity<Void> update(@RequestBody Map<String, Integer> request) {
//        System.out.println("update");
//        int count = request.get("count");  // 클라이언트에서 보낸 JSON 데이터 받기
//        System.out.println("newCount: " + count);
//        sseEmitters.sendEvent("update", count); // 모든 구독자에게 전송
//        return ResponseEntity.ok().build();
//    }



}
