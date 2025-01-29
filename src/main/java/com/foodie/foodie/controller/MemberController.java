package com.foodie.foodie.controller;

import com.foodie.foodie.entity.Images;
import com.foodie.foodie.entity.Member;
import com.foodie.foodie.entity.Post;
import com.foodie.foodie.security.util.CustomJWTException;
import com.foodie.foodie.security.util.JWTUtil;
import com.foodie.foodie.service.MemberService;
import com.foodie.foodie.service.PostService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService ms;

//    @PostMapping("/loginLocal")
//    public HashMap<String , Object> loginLocal(
//            @RequestBody Member member,
//            HttpSession session ) {
//
//        System.out.println("loginLocal");
//        HashMap<String , Object> result = new HashMap<>();
//        Member mem = ms.getMember(member.getEmail());
//        if(mem == null) {
//            result.put("msg", "해당 아이디가 없습니다");
//        }else if(!mem.getPwd().equals(member.getPwd())){
//            result.put("msg", "비밀번호가 일치하지 않습니다.");
//        }else {
//            session.setAttribute("memberid", mem.getMemberid() );
//            session.setAttribute("loginUser", mem.getEmail());
//            result.put("msg", "ok");
//            result.put("loginUser", mem);
//        }
//        return result;
//    }

    @GetMapping("/getLoginUser")
    public HashMap<String , Object> getLoginUser(HttpSession session, @RequestParam("email") String email) {
        HashMap<String, Object> result = new HashMap<>();

        // loginUser 멤버정보 조회
        Member member = ms.getMemberByEmail(email);
        result.put("loginUser", member);
        return result;
    }

    @PostMapping("/emailCheck")
    public HashMap<String, Object> emailCheck(@RequestParam("email") String email){
        HashMap<String, Object> result = new HashMap<String, Object>();
        Member member = ms.getMemberByEmail(email);
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
//        session.removeAttribute("loginUser");
        result.put("msg", "ok");
        return result;
    }

    @PostMapping("/updateProfile")
    public HashMap<String, Object> updateProfile(@RequestBody Member member, HttpSession session) {
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("updateProfile:" + member);
        ms.updateMember( member );
//        session.setAttribute("loginUser", member.getEmail() );
        result.put("msg", "ok");
        return result;
    }

    @Autowired
    PostService ps;

    @GetMapping("/getMyPost")
    public HashMap<String , Object> getMyPost(@RequestParam("memberid") int memberid,HttpSession session) {
        HashMap<String, Object> result = new HashMap<>();

//        List list = null;
        List list2 = null;
//        int memberid = (int)session.getAttribute("memberid");

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




    @GetMapping("/getProfile")
    public HashMap<String , Object> getProfile(@RequestParam("memberid") int memberid) {
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("getProfile:" + memberid);

        result.put("profile", ms.getMemberByMemberid(memberid));
        return result;
    }





    @GetMapping("/refresh/{refreshToken}")
    public HashMap<String, Object> refresh(
            @PathVariable("refreshToken") String refreshToken,
            @RequestHeader("Authorization") String authHeader
    ) throws CustomJWTException {

        HashMap<String, Object> result = new HashMap<>();

        // 리프레시 토큰이 없다면
        if( refreshToken == null ) throw new CustomJWTException("NULL_REFRESH");
        // Authorization 을 담은 헤더가 없다면
        if( authHeader == null || authHeader.length() < 7 )
            throw new CustomJWTException("INVALID_HEADER");

        //추출한 내용의 7번째 글자부터 끝까지 추출
        String accessToken = authHeader.substring(7);

        // 유효시간이 지났는지 검사
        Boolean expAt = checkExpiredToken( accessToken );

        if( expAt ){
            System.out.println("토큰 유효기간 아직 안지났습니다. 계속 사용합니다");
            result.put("accessToken", accessToken);
            result.put("refreshToken", refreshToken);
        }else{
            System.out.println("토큰이 갱신되었습니다");
            // accessToken 기간 만료시  refresh 토큰으로 재 검증하여 사용자 정보 추출
            Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

            // 토큰 교체
            String newAccessToken = JWTUtil.generateToken(claims, 1);

            // 리프레시토큰의 exp 를 꺼내서 현재 시간과 비교
            Boolean expRt = checkTime( (Integer)claims.get("exp") );
            String newRefreshToken = "";
            // 기존 리프레시토큰의 유효기간이 한시간도 안남았다면 교체 , 아직 쓸만하다면 그데로 사용
            if( expRt )   newRefreshToken = JWTUtil.generateToken(claims, 60*24);
            else newRefreshToken = refreshToken;

            result.put("accessToken", newAccessToken);
            result.put("refreshToken", newRefreshToken);
        }
        return result;
    }

    private Boolean checkTime(Integer exp) {
        java.util.Date expDate = new java.util.Date( (long)exp * (1000 ));//밀리초로 변환
        long gap = expDate.getTime() - System.currentTimeMillis();//현재 시간과의 차이 계산
        long leftMin = gap / (1000 * 60); //분단위 변환
        //1시간도 안남았는지..
        return leftMin < 60;
    }

    private Boolean checkExpiredToken(String accessToken) {

        try {
            JWTUtil.validateToken(accessToken);
        } catch (CustomJWTException e) {
            // throw new RuntimeException(e);
            if( e.getMessage().equals("Expired") ){
                return false;
            }
        }
        return true;
    }



}
