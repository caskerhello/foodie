import React, {useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';
import { loginAction } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import {Cookies} from 'react-cookie'

import '../../style/editprofile.css'

import jaxios from '../../util/jwtUtil';

const EditProfile = () => {
    const [memberid, setMemberid] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk ] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [profilemsg, setProfilemsg] = useState('');
    const [profileimg, setProfileimg] = useState('');
    // const [accessToken, setAccessToken] = useState('')
    // const [refreshToken, setRefreshToken] = useState('')
    const [oldImgsrc, setOldImgSrc] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({display:"none"});
    const lUser = useSelector( state=>state.user );
    //프로필 업데이트후에도 토큰 유지시키기 위함
    const { accessToken, refreshToken } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies()
    

    useEffect(
        ()=>{
            setMemberid(lUser.memberid)
            setEmail( lUser.email )
            setNickname(lUser.nickname )
            // setPhone( lUser.phone )
            setOldImgSrc( lUser.profileimg )
            setProfilemsg( lUser.profilemsg )

            if(lUser.provider == 'kakao'){
                setPwd('kakao');
                setPwdChk('kakao');
                document.getElementById('pwd').enabled=false;
                document.getElementById('pwdchk').enabled=false;
            }
        },[]
    )

    async function fileupload(e){
        const formData = new FormData();
        formData.append('image',  e.target.files[0]);
        try{
            const result = await jaxios.post('/api/member/fileUpload', formData);
            setImgSrc(result.data.filename);
            // `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.filename}`
            setImgStyle({display:"block", width:"200px"});
            setProfileimg(result.data.filename);
            // `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.filename}`
        }catch(err){ console.error(err) }
    }

    async function onSubmit(){
        if( !email ){return alert('이메일을 입력하세요')}
        if( !nickname ){return alert('닉네임을 입력하세요')}
        if( !pwd ){return alert('Password를 입력하세요')}
        if( pwd != pwdChk ){return alert('Password 확인이 일치하지 않습니다')}

        try{
            if( email != lUser.email ){
                let result = await jaxios.post('/api/member/emailCheck', null, {params:{email}} );
                if(result.data.msg == 'no' ){ return alert('이메일이 중복됩니다'); }
            }
            if( nickname != lUser.nickname ){
                let result = await jaxios.post('/api/member/nicknameCheck', null, {params:{nickname}} );
                if(result.data.msg == 'no' ){ return alert('닉네임이 중복됩니다'); }
            }

            let currentProfileImg = profileimg;
            if( !profileimg ) {
                currentProfileImg = oldImgsrc; // 상태가 비어 있으면 oldImgsrc를 사용
            }

            //회원정보수정
                let result = await jaxios.post('/api/member/updateProfile', { memberid, email, nickname, pwd, phone,  profileimg:currentProfileImg, profilemsg })
                if(result.data.msg=='ok'){
                    alert('회원 수정이 완료되었습니다.');
                    // 로그인유저 조회
                    const res = await jaxios.get('/api/member/getLoginUser',{params:{email}})
                    // 리덕스 수정

                    // 병합 후 리덕스에 저장
                    dispatch(loginAction({
                        ...res.data.loginUser,
                        accessToken,
                        refreshToken,
                    }));

                    // 쿠키에도 동기화
                    cookies.set('user', JSON.stringify({
                        ...res.data.loginUser,
                        accessToken,
                        refreshToken,
                    }), { path: '/' });
                }
                window.location.href=`${process.env.REACT_APP_ADDRESS}/myPage`;

        }catch(err){console.error(err)}
    }

    return (
        <div className='editformContainer'>

            <div className='editform'>
                <div className='logo'>내 정보 수정</div>
                <div className='field'>
                    <label>이메일</label>
                    <div className='input-wrapper'>
                        <input type='text' value={email} readOnly/>
                    </div>
                </div>
                <div className='field'>
                    <label>비밀번호</label>
                    <div className='input-wrapper'>
                        <input type='password' value={pwd} placeholder='비밀번호 입력' onChange={
                            (e) => {
                                setPwd(e.currentTarget.value)
                            }
                        }/>
                        <div className='message'>영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리</div>
                    </div>
                    <div className='input-wrapper'>
                        <input type='password' value={pwdChk} placeholder='비밀번호 확인' onChange={
                            (e) => {
                                setPwdChk(e.currentTarget.value)
                            }
                        }/>
                        <div className='message'>영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리</div>
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
                        <input type='text' value={profilemsg} placeholder='예시) 맛집은 저에게 맡기세요!' onChange={
                            (e) => {
                                setProfilemsg(e.currentTarget.value)
                            }
                        }/>
                    </div>
                </div>
                <div className='field'>
                    <label>사진</label>
                    <input type='file' onChange={(e) => {
                        fileupload(e)
                    }}/>
                </div>
                <div className='field'>
                    <label>사진미리보기</label>
                    
                    <div><img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${imgSrc}`} style={imgStyle}/></div>
                </div>

                <div className='btns'>
                    <button onClick={() => { onSubmit() }}>수정</button>
                    <button onClick={() => { navigate('/myPage') }}>뒤로</button>
                </div>
            </div>

        </div>
    )
}

export default EditProfile
