import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../../style/join.css'

const FindPassword = () => {

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [codeMessage, setCodeMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
    const [isCodeCheck, setIsCodeCheck] = useState(false); // 코드 확인 상태
    const [codeButtonStyle, setCodeButtonStyle] = useState({ backgroundColor: "rgb(238, 238, 238)", color: "rgb(191, 191, 191)" });
    const navigate = useNavigate();

    /* 이메일 형식 검증 정규식 */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    /* 이메일 형식 유효성 검사 */
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);

        // 이메일 형식 검사
        if (!emailRegex.test(value)) {
            setCodeButtonStyle({ backgroundColor: "rgb(238, 238, 238)", color: "rgb(191, 191, 191)" });
            setEmailMessage("이메일 형식이 올바르지 않습니다");
            setIsEmailValid(false);
        } else {
            setCodeButtonStyle({ backgroundColor: "rgba(255, 111, 97, 1)", color: "#fff" });
            setEmailMessage(''); // 에러 메시지 제거
            setIsEmailValid(true);
        }
    };

    /* 이메일 인증코드 검사 */
    const handleCodeChange = (event) => {
        const value = event.target.value;
        setCode(value);

        if (value.length === 6){
            setIsCodeCheck(true);
        } else {
            setIsCodeCheck(false);
        }
    }

    /* 인증코드 전송 */
    function sendCode(){
        setEmailMessage('이메일 전송 중...');
        axios.post('/api/member/sendCode', null, { params: { email } })
        .then((result) => {
            if(result.data.msg === 'yes'){
                setEmailMessage('이메일이 전송되었습니다');
                setIsEmailValid(true);
            }else{
                setEmailMessage('계정을 찾을 수 없습니다');
                setIsEmailValid(false);
            }
        }).catch((err) => { console.error('인증코드 전송 에러', err) })
    }

    /* 인증코드 확인 후 비밀번호 재설정 페이지로 이동 */
    function codeCheck(){
        axios.post('/api/member/codeCheck', null, { params: { code } })
        .then((result) => {
            if(result.data.msg == 'yes'){
                navigate(`/setNewPassword?email=${email}`);
            }else{
                setCodeMessage('인증 코드가 일치하지 않습니다');
            }
        })
    }

    return (
        <div className='joinformContainer'>
            <div className='joinform'>
                <div className='logo'>계정 찾기</div>
                <div className='field'>
                    <label>이메일 입력</label>
                    <div className='input-wrapper' style={{ flexDirection: 'row' }}>
                        <input type='text'
                            style={{ flex: '4', marginRight: '10px' }}
                            value={ email }
                            placeholder='이메일 입력'
                            onChange={ handleEmailChange }/>
                        <button className={ ( !isEmailValid ) ? "disabled" : "enabled" }
                            disabled={ !isEmailValid }
                            onClick={() => { sendCode() }}>
                            인증요청
                        </button>
                    </div>
                    <div className='message'
                        style={{ color: isEmailValid ? "blue" : "rgba(255, 111, 97, 1)" }}>
                        { emailMessage }
                    </div>
                </div>
                <div className='field'>
                    <div className='input-wrapper'>
                        <input type='text'
                        value={ code }
                        placeholder='인증번호 6자리를 입력하세요'
                        onChange={ handleCodeChange }
                        maxLength={ 6 }
                        readOnly={ !isEmailValid }
                        />
                    </div>
                    <div className='message'
                        style={{ color: isCodeCheck ? "blue" : "rgba(255, 111, 97, 1)" }}>
                        { codeMessage }
                    </div>
                </div>
                <div className='btns'>
                    <button className={ ( !isCodeCheck ) ? "disabled" : "enabled" }
                        disabled={ !isCodeCheck }
                        onClick={() => { codeCheck() }}>
                        확인
                    </button>
                    <button onClick={() => { navigate('/') }}>뒤로</button>
                </div>
            </div>
        </div>
    )
}

export default FindPassword;
