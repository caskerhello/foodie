import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ImageCropper from '../util/ImageCropper'; // 이미지 크롭
import getCroppedImg from '../util/GetCrop'; // 크롭 이미지 저장

import '../../style/join.css'

const Join = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [intro, setIntro] = useState('');
    const [imgSrc, setImgSrc] = useState(''); // 프로필 이미지
    const [previewImg, setPreviewImg] = useState(''); // 이미지 미리보기
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // 잘린 이미지 값
    const inputRef = useRef(); // 버튼 입력과 동시에 input 작동을 위함
    
    const [buttonStyle, setButtonStyle] = useState({backgroundColor: "rgb(242, 38, 38)", color: "#fff"});

    const [emailMessage, setEmailMessage] = useState('');
    const [pwdMessage, setPwdMessage] = useState('영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리');
    const [pwdCheckMessage, setPwdCheckMessage] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
    const [isPwdValid, setIsPwdValid] = useState(false); // 비밀번호 유효성 상태
    const [cropperModal, setCropperModal] = useState(false); // 자르기 모달 상태

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
            setButtonStyle({backgroundColor: "rgb(242, 38, 38)", color: "#fff"});
            setEmailMessage("이메일 형식이 올바르지 않습니다");
            setIsEmailValid(false);
        } else {
            setButtonStyle({backgroundColor: "rgb(242, 38, 38)", color: "#fff"});
            setEmailMessage(''); // 에러 메시지 제거
            setIsEmailValid(false);
        }
    };

    /* 이메일 중복 체크 */
    async function onEmailCheck(){
        if(!email){
            setIsEmailValid(false);
            setButtonStyle({backgroundColor: "rgb(242, 38, 38)", color: "#fff"});
            return alert('이메일을 입력하세요');
        }

        try{
            let result = await axios.post('/api/member/emailCheck', null, {params: {email}});
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

    /* 버튼 클릭 시 input 태그 작동을 위한 트리거 */
    const triggerFileSelectPopup = () => inputRef.current.click();

    /* 사진 업로드 시 작동되는 이벤트 함수 */
    const onSelectFile = (event) => {
        if(event.target.files && event.target.files.length > 0){
            setCropperModal(true);
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener('load', () => {
                setImgSrc(reader.result); // 이미지 URL 설정
                setCropperModal(true); // 크롭 모댤 표시
            }); // 이미지 업로드 후 작동될 콜백함수
        }
    }

    /* 크롭된 이미지 저장 핸들러 */
    const handleCropImage = async () => {
        try {
            // 크롭된 이미지 생성 (Base64 형식으로 반환됨)
            const croppedImageBase64 = await getCroppedImg(imgSrc, croppedAreaPixels);

            // Base64 데이터를 Blob으로 변환
            const base64ToBlob = (base64Data) => {
                const byteCharacters = atob(base64Data.split(',')[1]);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                    const slice = byteCharacters.slice(offset, offset + 1024);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    byteArrays.push(new Uint8Array(byteNumbers));
                }
                return new Blob(byteArrays, { type: 'image/png' });
            };

            // Base64 데이터를 Blob 객체로 변환
            const croppedImageBlob = base64ToBlob(croppedImageBase64);

            // FormData에 Blob 객체 추가
            const data = new FormData();
            data.append('image', croppedImageBlob, 'cropped_image.png'); // 서버로 보낼 이미지 추가

            // 업로드 요청
            const result = await axios.post('/api/member/fileUpload', data);

            setCropperModal(false); // 크롭 모달 닫기
            setPreviewImg(croppedImageBase64); // 이미지 미리보기 설정
            setImgSrc(result.data.filename); // 이미지 저장
        } catch (e) {
            console.error('이미지 업로드 중 오류:', e);
        }
    };

    // async function fileUpload(e){
    //     const formData = new FormData();
    //     formData.append('image', e.target.files[0]);
    //     const result = await axios.post('/api/member/fileUpload', formData);
    //     setImgSrc(result.data.filename);
    // }

    /* 회원가입 진행 */
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

    return (
        <div className='joinformContainer'>
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
                <div className='field' style={{margin: "5px 0"}}>
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
                    <div className='input-wrapper'>
                        <input
                            type='file'
                            accept='image/*'
                            ref={inputRef}
                            style={{display: 'none'}}
                            onChange={onSelectFile}
                        />
                        <button onClick={triggerFileSelectPopup}>사진선택</button>
                    </div>
                </div>
                {/* 크롭 모달 */}
                {cropperModal && (
                    <div className="container-cropper">
                        <div className="cropper-modal">
                            <ImageCropper
                                croppedImage={imgSrc} // 업로드된 이미지 URL
                                setCroppedAreaPixels={setCroppedAreaPixels} // 크롭 영역 상태 업데이트
                                width={1} // 가로 비율
                                height={1} // 세로 비율
                                cropShape="round" // 원형 크롭
                            />
                            <div className="cropper-buttons">
                                <button className="btn-cancel" onClick={() => setCropperModal(false)}>
                                    취소
                                </button>
                                <button className="btn-save" onClick={handleCropImage}>
                                    저장
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className='field'>
                    <label>사진미리보기</label>
                    <div><img src={
                        (previewImg)?
                            (`${previewImg}`)
                            :(`${process.env.REACT_APP_ADDRESS2}/images/user.png`)
                    } alt='프로필사진'/></div>
                </div>
                <div className='btns'>
                    <button onClick={() => { onSubmit() }}
                            disabled={!isEmailValid || !isPwdValid}
                            className={(!isEmailValid || !isPwdValid) ? "disabled" : "enabled"}
                    >가입</button>
                    <button onClick={() => { navigate('/') }}>뒤로</button>
                </div>
            </div>
        </div>
    )
}

export default Join
