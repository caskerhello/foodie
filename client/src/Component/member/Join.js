import React, {useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../style/join.css'

const Join = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk ] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [intro, setIntro] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({display:"none"});
    const [pwdMessage, setPwdMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (pwdChk === pwd) {
            setPwdMessage('');
        } else {
            setPwdMessage('비밀번호 확인이 일치하지 않습니다');
        }
    }, [pwd, pwdChk]);

    async function onSubmit(){
        if(!email){ return alert('이메일을 입력하세요'); }
        if(!pwd){ return alert('비밀번호를 입력하세요'); }
        if(pwd !== pwdChk){ return alert('비밀번호 확인이 일치하지 않습니다'); }
        if(!nickname){ return alert('닉네임을 입력하세요'); }

        try{
            let result = await axios.post('/api/member/emailCheck', null, {params:{email}} );
            if(result.data.msg == 'no' ){
                return alert('이메일이 중복됩니다');
            }

            result = await axios.post('/api/member/nicknameCheck', null, {params:{nickname}} );
            if(result.data.msg == 'no' ){
                return alert('닉네임이 중복됩니다');
            }

            result = await axios.post('/api/member/join', {email, pwd, nickname, phone, profilemsg:intro, profileimg:imgSrc });
            if(result.data.msg == 'ok'){
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
        setImgSrc(`${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.filename}`);
        setImgStyle({display:"block", width:"200px"});
    }

    return (
        <div className='joinform'>
            <div className='logo'>회원가입</div>
            <div className='field'>
                <label>이메일</label>
                <div className='input-wrapper'>
                    <input type='text' value={email} placeholder='이메일 입력' onChange={
                        (e) => {
                            setEmail(e.currentTarget.value)
                        }
                    }/>
                </div>
                <button>중복확인</button>
            </div>
            <div className='field'>
                <label>비밀번호</label>
                <div className='input-wrapper'>
                    <input type='password' value={pwd} placeholder='비밀번호 입력' onChange={
                        (e) => { setPwd(e.currentTarget.value) }
                    }/>
                    <div className='message'>영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리</div>
                </div>
                <div className='input-wrapper'>
                    <input type='password' value={pwdChk} placeholder='비밀번호 확인' onChange={
                        (e) => {
                            setPwdChk(e.currentTarget.value)
                        }
                    }/>
                    <div className='message'>{pwdMessage}</div>
                </div>
            </div>
            <div className='field'>
                <label>별명</label>
                <div className='input-wrapper'>
                    <input type='text' value={nickname} placeholder='별명 입력' onChange={
                        (e) => {
                            setNickname(e.currentTarget.value)
                        }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>전화번호</label>
                <div className='input-wrapper'>
                    <input type='text' value={phone} placeholder='전화번호 입력' onChange={
                        (e) => {
                            setPhone(e.currentTarget.value)
                        }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>소개</label>
                <div className='input-wrapper'>
                    <input type='text' value={intro} placeholder='예시) 맛집은 저에게 맡기세요!' onChange={
                        (e) => {
                            setIntro(e.currentTarget.value)
                        }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>사진</label>
                <input type='file' onChange={(e) => {
                    fileUpload(e)
                }}/>
            </div>
            <div className='field'>
                <label>사진미리보기</label>
                <div><img src={imgSrc} style={imgStyle}/></div>
            </div>

            <div className='btns'>
                <button onClick={() => { onSubmit() }}>가입</button>
                <button onClick={() => { navigate('/') }}>뒤로</button>
            </div>
        </div>
    )
}

export default Join
