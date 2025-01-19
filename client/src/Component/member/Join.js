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


    const navigate = useNavigate();

    async function onSubmit(){
        if(!email){ return alert('이메일을 입력하세요');}
        if(!pwd){ return alert('패스워드를 입력하세요');}
        if(pwd !== pwdChk){ return alert('패스워드 확인이 일치하지 않습니다');}
        if(!nickname){ return alert('닉네임을 입력하세요');}

        try{
            let result = await axios.post('/api/member/emailcheck', null, {params:{email}} );
            if(result.data.msg == 'no' ){
                return alert('이메일이 중복됩니다');
            }

            result = await axios.post('/api/member/nicknamecheck', null, {params:{nickname}} );
            if(result.data.msg == 'no' ){
                return alert('닉네임이 중복됩니다');
            }

            result = await axios.post('/api/member/join', {email, pwd, nickname, phone, intro, profileimg:imgSrc });
            if(result.data.msg=='ok'){
                alert('회원 가입이 완료되었습니다. 로그인하세요');
                navigate('/');
            }
        }catch(err){
            console.error(err);
        }
    }

    async function fileupload(e){
        const formData = new FormData();
        formData.append('image',  e.target.files[0]);
        const result = await axios.post('/api/member/fileupload', formData);
        setImgSrc(`http://localhost:8070/uploads/${result.data.filename}`);
        setImgStyle({display:"block", width:"200px"});
    }

    return (
        <div className='joinform'>
            <div className="logo" style={{fontSize:"2.0rem"}}>회원가입</div>
            <div className='field'>
                <label>이메일</label>
                <div className='input-wrapper'>
                    <input type="text" value={email} placeholder='이메일 입력' onChange={
                        (e) => { setEmail(e.currentTarget.value) }
                    }/>
                    <button type='button' className='send-button'>인증번호 받기</button>
                </div>
            </div>
            <div className='field'>
                <label>비밀번호</label>
                <div className='input-wrapper'>
                    <input type="password" value={pwd} placeholder='비밀번호 입력' onChange={
                        (e) => { setPwd(e.currentTarget.value) }
                    }/>
                </div>
                <div className='input-wrapper'>
                    <input type="password" value={pwdChk} placeholder='비밀번호 확인' onChange={
                        (e) => { setPwdChk(e.currentTarget.value) }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>별명</label>
                <div className='input-wrapper'>
                    <input type="text" value={nickname} placeholder='별명 입력' onChange={
                        (e) => {
                            setNickname(e.currentTarget.value)
                        }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>전화번호</label>
                <div className='input-wrapper'>
                    <input type="text" value={phone} placeholder='전화번호 입력' onChange={
                        (e) => {
                            setPhone(e.currentTarget.value)
                        }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>소개</label>
                <div className='input-wrapper'>
                    <input type="text" value={intro} placeholder='예시) 맛집은 저에게 맡기세요!' onChange={
                        (e) => {
                            setIntro(e.currentTarget.value)
                        }
                    }/>
                </div>
            </div>
            <div className='field'>
                <label>사진</label>
                <input type="file" onChange={(e) => {
                    fileupload(e)
                }}/>
            </div>
            <div className='field'>
                <label>사진미리보기</label>
                <div><img src={imgSrc} style={imgStyle}/></div>
            </div>

            <div className='btns'>
                <button onClick={() => { onSubmit() }}>가입
                </button>
                <button onClick={() => { navigate('/') }}>뒤로
                </button>
            </div>
        </div>
    )
}

export default Join
