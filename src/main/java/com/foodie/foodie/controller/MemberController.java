package com.foodie.foodie.controller;

import com.foodie.foodie.entity.Images;
import com.foodie.foodie.entity.Member;
import com.foodie.foodie.entity.Post;
import com.foodie.foodie.service.MemberService;
import com.foodie.foodie.service.PostService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService ms;

    @PostMapping("/loginLocal")
    public HashMap<String , Object> loginLocal(
            @RequestBody Member member,
            HttpSession session ) {

        System.out.println("loginLocal");
        HashMap<String , Object> result = new HashMap<>();
        Member mem = ms.getMember(member.getEmail());
        if(mem == null) {
            result.put("msg", "해당 아이디가 없습니다");
        }else if(!mem.getPwd().equals(member.getPwd())){
            result.put("msg", "비밀번호가 일치하지 않습니다.");
        }else {
            session.setAttribute("memberid", mem.getMemberid() );
            session.setAttribute("loginUser", mem.getEmail());
            result.put("msg", "ok");
            result.put("loginUser", mem);
        }
        return result;
    }

    @GetMapping("/getLoginUser")
    public HashMap<String , Object> getLoginUser(HttpSession session) {
        HashMap<String, Object> result = new HashMap<>();
        int id = (Integer) session.getAttribute("memberid");

        // loginUser 멤버정보 조회
        Member member = ms.getMemberByMemberid(id);

        // 로그인 유저의  follower 조회
//        List<Follow> followers = ms.getFollowers(id);

        // 로그인 유저가 following하는 멤버 조회
//        List<Follow> followings = ms.getFollowings(id);

        result.put("loginUser", member);
//        result.put("followers", followers);
//        result.put("followings", followings);

        return result;
    }

    @PostMapping("/emailCheck")
    public HashMap<String, Object> emailCheck(@RequestParam("email") String email){
        HashMap<String, Object> result = new HashMap<String, Object>();
        Member member = ms.getMember(email);
        if(member == null) result.put("msg", "yes");
        else result.put("msg", "no");
        return result;
    }

    @PostMapping("/nicknameCheck")
    public HashMap<String, Object> nicknameCheck(@RequestParam("nickname") String nickname){
        HashMap<String, Object> result = new HashMap<String, Object>();
        Member mem = ms.getMemberByNickname( nickname );
        if( mem != null ) result.put("msg", "no");
        else result.put("msg", "yes");
        return result;
    }

    @PostMapping("/join")
    public HashMap<String, Object> join( @RequestBody Member member){
        HashMap<String, Object> result = new HashMap<String, Object>();
        ms.insertMember(member);
        result.put("msg", "ok");
        return result;
    }

    @Autowired
    ServletContext context;

    @PostMapping("/fileUpload")
    public HashMap<String, Object> fileUpload( @RequestParam("image") MultipartFile file){

        HashMap<String, Object> result = new HashMap<String, Object>();
        String path = context.getRealPath("/uploads");

        Calendar today = Calendar.getInstance();
        long dt = today.getTimeInMillis();
        String filename = file.getOriginalFilename();
        String fn1 = filename.substring(0, filename.indexOf(".") );
        String fn2 = filename.substring(filename.indexOf(".") );
        String uploadPath = path + "/" + fn1 + dt + fn2;

        try {
            file.transferTo( new File(uploadPath) );
            result.put("filename", fn1 + dt + fn2);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    @GetMapping("/logout")
    public HashMap<String, Object> logout(HttpSession session) {
        HashMap<String, Object> result = new HashMap<>();
        session.removeAttribute("loginUser");
        result.put("msg", "ok");
        return result;
    }

    @PostMapping("/updateProfile")
    public HashMap<String, Object> updateProfile(@RequestBody Member member, HttpSession session) {
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("updateProfile:" + member);
        ms.updateMember( member );
        session.setAttribute("loginUser", member.getEmail() );
        result.put("msg", "ok");
        return result;
    }

    @Autowired
    PostService ps;

    @GetMapping("/getMyPost")
    public HashMap<String , Object> getMyPost(HttpSession session) {
        HashMap<String, Object> result = new HashMap<>();

//        List list = null;
        List list2 = null;
        int memberid = (int)session.getAttribute("memberid");

        System.out.println(memberid);

        List<Post> list = ps.getPostListByMemberid(memberid);
        List<String> imglist = new ArrayList<String>();
        for( Post p : list) {
            List<Images> imgl = ps.getImgListByPostidOrderByPostidDesc( p.getPostid() );
            String imgname = imgl.get(0).getSavefilename();
            imglist.add( imgname );
        }

        result.put("postList", list);
        result.put("imgList", imglist);
        return result;
    }



}
