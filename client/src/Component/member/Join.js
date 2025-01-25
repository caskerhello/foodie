import React, {useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../style/join.css'

const Join = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [intro, setIntro] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    const [buttonStyle, setButtonStyle] = useState({backgroundColor: "rgb(242, 38, 38)", color: "#fff"});
    const [imgStyle, setImgStyle] = useState({display:"none"});

    const [emailMessage, setEmailMessage] = useState('');
    const [pwdMessage, setPwdMessage] = useState('영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리');
    const [pwdCheckMessage, setPwdCheckMessage] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
    const [isPwdValid, setIsPwdValid] = useState(false); // 비밀번호 유효성 상태

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

    /* 이메일 형식 검증 정규식 */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    /* 이메일 형식 유효성 검사 */
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // 이메일 형식 검사
        if (!emailRegex.test(value)) {
            setEmailMessage("이메일 형식이 올바르지 않습니다");
            setIsEmailValid(false);
        } else {
            setEmailMessage(''); // 에러 메시지 제거
            setIsEmailValid(false);
        }
    };

    /* 이메일 중복 체크 */
    async function onEmailCheck(){
        try{
            let result = await axios.post('/api/member/emailCheck', null, {params: {email}} );
            if(result.data.msg === 'yes'){
                setButtonStyle({backgroundColor: "rgb(238, 238, 238)", color: "rgb(191, 191, 191)"});
                setEmailMessage('사용 가능한 이메일입니다');
                setIsEmailValid(true); // 이메일 유효 상태
            }else{
                setButtonStyle({backgroundColor: "rgb(242, 38, 38)", color: "#fff"});
                setEmailMessage('이메일이 중복됩니다');
                setIsEmailValid(false); // 이메일 유효하지 않은 상태
            }
        }catch(err){ console.error(err) }
    }

    async function onSubmit(){
        if(!nickname){ return alert('닉네임을 입력하세요'); }

        try{
            let result = await axios.post('/api/member/nicknameCheck', null, {params: {nickname}});
            if(result.data.msg === 'no' ){
                return alert('닉네임이 중복됩니다');
            }

            result = await axios.post('/api/member/join', {email, pwd, nickname, phone, profilemsg: intro, profileimg: imgSrc});
            if(result.data.msg === 'ok'){
                alert('회원 가입이 완료되었습니다. 로그인하세요');
                navigate('/');
            }
        }catch(err){
            console.error(err);
        }
    }

    async function fileUpload(e){
        const formData = new FormData();
        formData.append('image',  e.target.files[0]);
        const result = await axios.post('/api/member/fileUpload', formData);
        setImgSrc(result.data.filename);
        // `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.filename}`
        setImgStyle({display:"block", width:"200px"});
    }

    return (
        <div className='joinform'>
            <div className='logo'>회원가입</div>
            <div className='field'>
                <label>이메일</label>
                <div className='input-wrapper' style={{flexDirection: "row"}}>
                    <input type='text' style={{flex: "5", marginRight: "10px"}} value={email} placeholder='이메일 입력'
                           onChange={handleEmailChange}/>
                    <button style={buttonStyle} onClick={() => { onEmailCheck() }}>중복확인</button>
                </div>
                <div className='message' style={{
                    color: isEmailValid ? "blue" : "rgb(242, 38, 38)"
                }}>{emailMessage}</div>
            </div>
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
            <div className='field'>
                <label>별명</label>
                <div className='input-wrapper'>
                    <input type='text' value={nickname} placeholder='별명 입력' onChange={
                        (e) => { setNickname(e.currentTarget.value) }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>전화번호</label>
                <div className='input-wrapper'>
                    <input type='text' value={phone} placeholder='전화번호 입력' onChange={
                        (e) => { setPhone(e.currentTarget.value) }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>소개</label>
                <div className='input-wrapper'>
                    <input type='text' value={intro} placeholder='예시) 맛집은 저에게 맡기세요!' onChange={
                        (e) => { setIntro(e.currentTarget.value) }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>사진</label>
                <input type='file' onChange={
                    (e) => { fileUpload(e) }
                }/>
            </div>
            <div className='field'>
                <label>사진미리보기</label>
                <div><img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${imgSrc}`} style={imgStyle}/></div>
            </div>

            <div className='btns'>
                <button onClick={() => { onSubmit() }}
                        disabled={!isEmailValid || !isPwdValid}
                        className={(!isEmailValid || !isPwdValid) ? "disabled" : "enabled"}
                >가입</button>
                <button onClick={() => { navigate('/') }}>뒤로</button>
            </div>
        </div>
    )
}

export default Join
