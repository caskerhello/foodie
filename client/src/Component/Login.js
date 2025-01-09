import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../style/login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    // const dispatch = useDispatch();  // 쓰기를 위한 함수 생성

    const navigate = useNavigate();
    // async function onLoginLocal(){
    //     if(!email){return alert("이메일을 입력하세요");}
    //     if(!pwd){return alert("패스워드를 입력하세요");}
    //     try{
    //         const result = await axios.post('/api/member/loginlocal', {email, pwd} )
    //         if( result.data.msg== 'ok'){
    //             alert("로그인 되었습니다")
    //             const res=await axios.get('/api/member/getLoginUser')

    //             console.log(res.data.loginUser)
    //             console.log('followings', res.data.followings)
    //             console.log('followers', res.data.followers)

    //             dispatch( loginAction( res.data.loginUser )  );     
    //             dispatch( setFollowers( {followers:res.data.followers} ) );          
    //             dispatch( setFollowings( {followings:res.data.followings} ) );
                
    //             navigate('/main'); 
    //         }else{
    //             setPwd("");
    //             return alert(result.data.msg);
    //         }
    //     }catch(err){ console.error(err)}
    // }

    return (
        <div className="loginform">
            <div> 즐거운 미식 생활의 시작 <span>식신</span> </div>
            <div className='field'>
                <label>E-MAIL</label>
                <input type="text" value={email} onChange={(e)=>{ setEmail(e.currentTarget.value) }}/>
            </div>
            <div className='field'>
                <label>PASSWORD</label>
                <input type="password" value={pwd} onChange={(e)=>{ setPwd(e.currentTarget.value) }}/>
            </div>
            <div className='btns'>
                <button onClick={ ()=>{ navigate('/main') } }>LOGIN</button>
                <button onClick={ ()=>{ navigate('/join') } }>JOIN</button>
            </div>
            <div className='snslogin'>
                <button onClick={()=>{
                    window.location.href='http://localhost:8070/member/kakaostart';
                }}>KAKAO</button>
                <button>NAVER</button>
                <button>GOOGLE</button>
                <button>FACEBOOK</button>
            </div>
        </div>
    )
}

export default Login
