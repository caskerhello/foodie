import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiSolidKey } from "react-icons/bi";
import { BiSolidUserPlus } from "react-icons/bi";

import { useDispatch } from 'react-redux';
import { loginAction, setFollowers, setFollowings } from './store/userSlice';
import {Cookies} from 'react-cookie'

import '../style/login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const dispatch = useDispatch();  // 쓰기를 위한 함수 생성
    const cookies = new Cookies()
    const navigate = useNavigate();

    async function onLoginLocal(){
        if(!email){return alert("이메일을 입력하세요");}
        if(!pwd){return alert("패스워드를 입력하세요");}
        
        try{            

            const result = await axios.post('/api/member/loginLocal', {email, pwd} )
            if( result.data.msg== 'ok'){
               
                const res=await axios.get('/api/member/getLoginUser')
                const lUser = res.data.loginUser;

                cookies.set('user', JSON.stringify( lUser ) , {path:'/', })                

                dispatch( loginAction( res.data.loginUser )  );                     
                
                navigate('/main'); 
            }else{
                setPwd("");
                return alert(result.data.msg);
            }
        }catch(err){ console.error(err)}
    }

    const onSubmitEnter = (e) => {
        // if(e.key === 'Enter' || e.keyCode === 13) {
        if(e.key === 'Enter') {
          // 엔터 키 입력 후 발생하는 이벤트 작성
          console.log('enter 입력');
          onLoginLocal()
        }    
    }

    return (
    <div className="loginContainer">
        <div className="loginform">
            <br></br>
            <div className='title'> 즐거운 미식 생활의 시작 <span>식신</span> </div>
            <br></br>
            <div className='field'>
                <br></br>
                <label></label>
                <input type="text" value={email} placeholder='이메일을 입력해주세요' onChange={(e)=>{ setEmail(e.currentTarget.value) }} onKeyDown={onSubmitEnter}/>
            </div>
            
            <div className='field'>
                <label></label>
                <input type="password" value={pwd} placeholder='비밀번호를 입력해주세요' onChange={(e)=>{ setPwd(e.currentTarget.value) }} onKeyDown={onSubmitEnter}/>
            </div>

            <div className='btns'>
                <div className='btn'><BiSolidKey style={{height:'40px',width:'40px'}} 
                onClick={ ()=>{ onLoginLocal() }}            
                />
            </div>

            <div className='btn'>
                <BiSolidUserPlus style={{height:'50px',width:'50px'}} onClick={ ()=>{ navigate('/join') } }/>
                </div>
                    <button 
                    // onClick={()=>{
                    //     window.location.href=`${process.env.REACT_APP_ADDRESS2}/member/kakaostart`;
                    // }}
                    ><img style={{height:"40px"  }} src="images/free-icon-kakao-talk.png"/></button>
                </div>
            
        </div>
    </div>
    )
}

export default Login
