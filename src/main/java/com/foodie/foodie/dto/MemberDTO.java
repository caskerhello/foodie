package com.foodie.foodie.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.*;
import java.util.stream.Collectors;

public class MemberDTO extends User {
    public MemberDTO(String username, String password, int memberid, String nickname, String phone, String profileimg, String profilemsg , String snsid, String provider, List<String> authorities) {
        super(username, password,
                authorities.stream()
                        .map( str -> new SimpleGrantedAuthority("ROLE_"+str) )
                        .collect(Collectors.toList()));
        this.memberid = memberid;         this.email= username;
        this.pwd = password;                    this.nickname = nickname;
        this.phone = phone;                      this.provider = provider;
        this.snsid = snsid;                         this.profileimg = profileimg;
        this.profilemsg = profilemsg;          this.roleNames = authorities;
    }
    private int memberid;         private String email;
    private String pwd;             private String nickname;
    private String phone;          private String provider;
    private String snsid;            private String profileimg;
    private String profilemsg;    private List<String> roleNames = new ArrayList<String>();


    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("email", email);
        dataMap.put("pwd",pwd);
        dataMap.put("memberid", memberid);
        dataMap.put("nickname", nickname);
        dataMap.put("phone", phone);
        dataMap.put("profileimg", profileimg);
        dataMap.put("profilemsg", profilemsg);
        dataMap.put("snsid", snsid);
        dataMap.put("provider", provider);
        dataMap.put("roleNames", roleNames);
        return dataMap;
    }
}
