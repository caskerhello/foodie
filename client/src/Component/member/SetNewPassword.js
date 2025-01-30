import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../../style/join.css'

const SetNewPassword = (props) => {
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [pwdMessage, setPwdMessage] = useState('영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리');
    const [pwdCheckMessage, setPwdCheckMessage] = useState('');
    const [isPwdValid, setIsPwdValid] = useState(false);
    const navigate = useNavigate();

    /* 비밀번호 정규식 */
        const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,15}$/;
    
    /* 비밀번호 유효성 검사 */
    useEffect(() => {
        if (!pwd) {
            setPwdMessage('영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리');
            setPwdCheckMessage('');
            setIsPwdValid(false);
        } else if (!pwdRegex.test(pwd)) {
            setPwdMessage('비밀번호 형식이 올바르지 않습니다');
            setPwdCheckMessage('');
            setIsPwdValid(false);
        } else if (pwd !== pwdCheck) {
            setPwdMessage('');
            setPwdCheckMessage('비밀번호 확인이 일치하지 않습니다');
            setIsPwdValid(false);
        } else {
            setPwdMessage('');
            setPwdCheckMessage('');
            setIsPwdValid(true);
        }
    }, [pwd, pwdCheck]);

    function onSubmit(){
        //axios.post('/api/member/setNewPassword')
    }

    return (
        <div className='joinformContainer'>
            <div className='joinform'>
                <div className='logo'>비밀번호 재설정</div>
                <div className='field'>
                <label>비밀번호</label>
                    <div className='input-wrapper'>
                        <input type='password' value={pwd} placeholder='비밀번호 입력' onChange={
                            (e) => { setPwd(e.currentTarget.value) }
                        }/>
                        <div className='message'>{pwdMessage}</div>
                    </div>
                    <div className='input-wrapper'>
                        <input type='password' value={pwdCheck} placeholder='비밀번호 확인' onChange={
                            (e) => { setPwdCheck(e.currentTarget.value) }
                        }/>
                        <div className='message'>{pwdCheckMessage}</div>
                    </div>
                </div>
                <div className='btns'>
                    <button onClick={() => { onSubmit() }}
                        className={(!isPwdValid) ? "disabled" : "enabled"}
                        disabled={!isPwdValid}>설정</button>
                    <button onClick={() => { navigate('/') }}>뒤로</button>
                </div>
            </div>
        </div>
    )
}

export default SetNewPassword
