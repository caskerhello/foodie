package com.foodie.foodie.security.service;

import com.foodie.foodie.dto.MemberDTO;
import com.foodie.foodie.entity.Member;
import com.foodie.foodie.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomUserDetailsService  implements UserDetailsService {


    private final MemberRepository mR;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 전송된  username 으로 사용자를 검색하고 DTO 객체에 넣어서  리턴하면서
        // UsernamePasswordAuthenticationFilter.class 로 이동합니다

        // 멤버를 조회
        Optional<Member> member = mR.findByEmail(username);
        if ( member.isEmpty() ) {
            throw new UsernameNotFoundException(username + " - User Not found");
        }
        List<String> list = new ArrayList<>();
        list.add("USER");
        MemberDTO memberdto = new MemberDTO(
                member.get().getEmail(),
                member.get().getPwd(),
                member.get().getMemberid(),
                member.get().getNickname(),
                member.get().getPhone(),
                member.get().getProfileimg(),
                member.get().getProfilemsg(),
                member.get().getSnsid(),
                member.get().getProvider(),
                list
        );

        return memberdto;
    }
}
