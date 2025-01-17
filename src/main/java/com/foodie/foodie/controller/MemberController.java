package com.foodie.foodie.controller;

import com.foodie.foodie.entity.Member;
import com.foodie.foodie.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/member")
public class MemberController {



    @Autowired
    MemberService ms;

    @PostMapping("/loginlocal")
    public HashMap<String , Object> loginlocal(
            @RequestBody Member member,
            HttpSession session ) {

        HashMap<String , Object> result = new HashMap<>();

        Member mem = ms.getMember( member.getEmail() );
//        Member mem = ms.getMember(email);

        if(mem == null ) {
            result.put("msg", "해당 아이디가 없습니다");
        }else if( !mem.getPwd().equals( member.getPwd() ) ) {
            result.put("msg", "패스워드가 틀립니다.");
        }else {

            session.setAttribute("loginUser", mem.getEmail());
            result.put("msg", "ok");
            result.put("loginUser", mem);
        }
        return result;
    }




}
