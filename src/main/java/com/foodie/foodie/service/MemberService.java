package com.foodie.foodie.service;

import com.foodie.foodie.repository.MemberRepository;
import com.foodie.foodie.entity.Member;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class MemberService {

    @Autowired
    MemberRepository mr;

    BCryptPasswordEncoder bc = new BCryptPasswordEncoder();

    public Member getMember(String email) {
        Optional<Member> member = mr.findByEmail(email);
        if ( member.isEmpty() ) {
            throw new UsernameNotFoundException(email + " - User Not found");
        } else {
            return member.get();
        }
    }

    public Member getMemberByNickname(String nickname) {
        return mr.getMemberByNickname( nickname );
    }

    public void insertMember(Member member) {
        member.setPwd(bc.encode(member.getPwd()));

        mr.save(member);
    }

    public Member getMemberByMemberid(int id) {
        return mr.getMemberByMemberid(id);
    }

    public void updateMember(Member member) {
        Optional<Member> memberOptional = mr.findByMemberid(member.getMemberid());
        if(memberOptional.isPresent()) {
            Member updateMember = memberOptional.get();
            updateMember.setNickname(member.getNickname());
            updateMember.setEmail(member.getEmail());
            updateMember.setPwd(bc.encode(member.getPwd()));
            updateMember.setPhone(member.getPhone());
            updateMember.setProfileimg(member.getProfileimg());
            updateMember.setProfilemsg(member.getProfilemsg());
        }
    }

    public Member getMemberByEmail(String email) {
        Optional<Member> member = mr.findByEmail(email);
        if ( member.isEmpty() ) {
            return null;
        } else {
            return member.get();
        }
    }

    /* 보내는 이메일 객체 */
    @Autowired
    JavaMailSender JMSender;

    /* 이메일 전송 주체 */
    @Value("${spring.mail.username}")
    private String emailSender;

    /* 생성된 랜덤 인증 코드 */
    private static int code;

    /* 이메일 인증 코드 생성 및 전송 */
    public int sendCode(String email) {
        code = 100000 + (int) (Math.random() * 900000); // 100000 ~ 999999

        // 전송된 이메일 내용(수신자, 제목, 내용 등) 구성 객체
        MimeMessage message = JMSender.createMimeMessage();

        try {
            message.setFrom(emailSender);
            message.setRecipients(MimeMessage.RecipientType.TO, email);
            message.setSubject("즐거운 미식 생활의 시작, 식신! 이메일 인증 코드");
            // HTML 형식 이메일 본문 작성
            String body = "<!DOCTYPE html>" +
                    "<html lang='ko'>" +
                    "<head>" +
                    "    <meta charset='UTF-8'>" +
                    "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "    <title>이메일 인증 코드</title>" +
                    "    <style>" +
                    "        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }" +
                    "        .container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #ddd; max-width: 500px; margin: auto; }" +
                    "        .code { font-size: 24px; font-weight: bold; color: #2D89EF; margin: 20px 0; }" +
                    "        .footer { font-size: 12px; color: #777; margin-top: 20px; }" +
                    "    </style>" +
                    "</head>" +
                    "<body>" +
                    "    <div class='container'>" +
                    "        <h2>이메일 인증 코드</h2>" +
                    "        <p>아래의 인증 코드를 입력하여 이메일 인증을 완료하세요.</p>" +
                    "        <div class='code'>" + code + "</div>" +
                    "        <p class='footer'>이 메일은 자동 발송되었습니다. 문의사항은 고객센터를 이용해주세요.</p>" +
                    "    </div>" +
                    "</body>" +
                    "</html>";
            message.setContent(body, "text/html; charset=UTF-8");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        JMSender.send(message); // 구상 완료된 message 를 JMSender 로 전달
        return code;
    }

    /* 비밀번호 재설정 */
    public void updateNewPassword(String email, String pwd) {
        Member member = getMemberByEmail(email);
        System.out.println("newpwd:" + pwd);
        member.setPwd(bc.encode(pwd));
        mr.save(member);
    }
}
