package com.foodie.foodie.security.filter;


import com.foodie.foodie.dto.MemberDTO;
import com.foodie.foodie.security.util.CustomJWTException;
import com.foodie.foodie.security.util.JWTUtil;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeaderStr = request.getHeader("Authorization");
        String accessToken = authHeaderStr.substring(7);
        try {
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            int memberid = (int) claims.get("memberid");
            String email = (String) claims.get("email");
            String pwd = (String) claims.get("pwd");
            String nickname = (String) claims.get("nickname");
            String phone = (String) claims.get("phone");
            String snsid = (String) claims.get("snsid");
            String provider = (String) claims.get("provider");
            String profileimg = (String) claims.get("profileimg");
            String profilemsg = (String) claims.get("profilemsg");
            List<String> list = new ArrayList<>();
            list.add("USER");

            MemberDTO memberDTO = new MemberDTO(email, pwd, memberid, nickname, phone, profileimg, profilemsg,  snsid , provider,  list);
            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberDTO, pwd , memberDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        } catch (CustomJWTException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request)  throws ServletException {
        String path = request.getRequestURI();
        if(request.getMethod().equals("OPTIONS"))
            return true;

        if(path.equals("/member/test"))
            return true;
        
        //로그인
        if(path.startsWith("/member/loginLocal"))
            return true;

        //토큰 갱신
        if(path.startsWith("/member/refresh"))
            return true;
        
        //이미지들
        if(path.startsWith("/uploads/"))
            return true;
        
        //현재 한쓰고 있지만 나중에 쓸일 있을까봐 남겨둠
        if(path.startsWith("/images/"))
            return true;

        //회원가입시 제외
        if(path.startsWith("/member/emailCheck"))
            return true;
        if(path.startsWith("/member/nicknameCheck"))
            return true;
        if(path.startsWith("/member/fileUpload"))
            return true;
        if(path.startsWith("/member/join"))
            return true;
        if(path.startsWith("/member/getEmail"))
            return true;
        if(path.startsWith("/member/sendCode"))
            return true;
        if(path.startsWith("/member/codeCheck"))
            return true;
        if(path.startsWith("/member/setNewPassword"))
            return true;

//        if(path.startsWith("/member/kakaostart"))
//            return true;
//        if(path.startsWith("/member/kakaoLogin"))
//            return true;

        return false;
    }
}
