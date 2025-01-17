import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiSolidKey } from "react-icons/bi";
import { BiSolidUserPlus } from "react-icons/bi";

import '../style/login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    // const dispatch = useDispatch();  // 쓰기를 위한 함수 생성

    const navigate = useNavigate();

    async function onLoginLocal(){
        if(!email){return alert("이메일을 입력하세요");}
        if(!pwd){return alert("패스워드를 입력하세요");}
        
        try{
            // console.log(email,pwd)

            const result = await axios.post('/api/member/loginlocal', {email, pwd} )
            if( result.data.msg== 'ok'){
                alert("로그인 되었습니다")
                // const res=await axios.get('/api/member/getLoginUser')

                // console.log(res.data.loginUser)
                // console.log('followings', res.data.followings)
                // console.log('followers', res.data.followers)

                // dispatch( loginAction( res.data.loginUser )  );     
                // dispatch( setFollowers( {followers:res.data.followers} ) );          
                // dispatch( setFollowings( {followings:res.data.followings} ) );
                
                navigate('/main'); 
            }else{
                setPwd("");
                return alert(result.data.msg);
            }
        }catch(err){ console.error(err)}
    }

    return (
        <div className="loginform">
            <br></br>
            <div className='title'> 즐거운 미식 생활의 시작 <span>식신</span> </div>
            <br></br>
            <div className='field'>
                <br></br>
                <label></label>
                <input type="text" value={email} placeholder='이메일을 입력해주세요' onChange={(e)=>{ setEmail(e.currentTarget.value) }}/>
            </div>
            
            <div className='field'>
                <label></label>
                <input type="password" value={pwd} placeholder='비밀번호를 입력해주세요' onChange={(e)=>{ setPwd(e.currentTarget.value) }}/>
            </div>

            <div className='btns'>
            <div className='btn'><BiSolidKey style={{height:'40px',width:'40px'}} 
            onClick={ ()=>{ onLoginLocal() }}
            // onClick={ ()=>{ navigate('/main')}}
            />
            {/* <button onClick={ ()=>{ navigate('/main') } }>LOGIN</button> */}</div>

            <div className='btn'>
            <BiSolidUserPlus style={{height:'50px',width:'50px'}} onClick={ ()=>{ navigate('/join') } }/>
            {/* <button onClick={ ()=>{ navigate('/join') } }>JOIN</button> */}
            </div>
                
                

                <button onClick={()=>{
                    window.location.href='http://localhost:8070/member/kakaostart';
                }}><img style={{height:"40px"  }} src="images/free-icon-kakao-talk.png"/></button>
            </div>
            {/* <div className='snslogin'>
                <button onClick={()=>{
                    window.location.href='http://localhost:8070/member/kakaostart';
                }}><img style={{height:"40px"  }} src="images/free-icon-kakao-talk.png"/></button>
                <button>NAVER</button>
                <button>GOOGLE</button>
                <button>FACEBOOK</button>
            </div> */}
        </div>
    )
}

export default Login
