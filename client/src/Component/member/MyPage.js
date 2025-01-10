import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MainMenu from '../MainMenu';

import '../../style/mypage.css'

const MyPage = () => {
    const [ imgSrc, setImgSrc ]=useState('http://localhost:8070/images/user.png');
    const [ followers, setFollowers] = useState([]);  // 나를 follow 하는 사람들
    const [ followings, setFollowings ] = useState([]);   // 내가 following 하는 사람들
    const [ postList, setPostList ] = useState([]);  // 로그인 유저가 작성한 포스트들
    const [ imgList, setImgList] = useState([]);   // 하단에 포스트를 대변할 수 있는 이미지들
    const [loginUser, setLoginUser] = useState({});
    // const lUser = useSelector( state=>state.user );
    const [ word, setWord ] = useState('');

    const navigate=useNavigate();

    useEffect(
        ()=>{
            
        },[]
    )


    return (
        <div className='mypage'>
            <div className='title'>내 정보</div>
            <MainMenu setWord={setWord} />

            <div className='userinfo'>
                
                <div className='img'>
                    <img src={imgSrc} />
                </div>
                <div className='profile'>
                    <div className='field'>
                        <label>이메일</label>
                        {/* <div>{lUser.email}</div> */}
                    </div>
                    <div className='field'>
                        <label>닉네임</label>
                        {/* <div>{lUser.nickname}</div> */}
                    </div>
                    <div className='field'>
                        <label>팔로워</label>
                        {/* <div>{ (lUser.Followers)?(lUser.Followers.length):(0) }</div> */}
                    </div>
                    <div className='field'>
                        <label>팔로잉</label>
                        {/* <div>{ (lUser.Followings)?(lUser.Followings.length):(0) }</div> */}
                    </div>
                    <div className='field'>
                        <label>소개</label>
                        {/* <div>{lUser.profilemsg}</div> */}
                    </div>
                </div>
            </div>
            <div className='btns' >
                <button onClick={()=>{navigate('/editProfile')}}>프로필 수정</button>
                {/* <button onClick={()=>{navigate('/writePost')}}>팔로우/팔로워</button> */}
            </div>
            <div className='userpost' >
                <div style={{width:'800px',height:'900px'}}></div>
                {/* 한줄에 세개씩 이미지를 적당한 크기로 나열해주세요. 필요하다면  css 수정도 해주세요 */}
                {/* {
                    (imgList)?(
                        imgList.map((imgs, idx)=>{
                            return (
                                <div key={idx} onClick={
                                    ()=>{ navigate(`/postone/${postList[idx].id}`) }
                                }>
                                    <img src={`http://localhost:8070/uploads/${imgs}`} />
                                </div>
                            )
                        })
                    ):(null)
                    
                } */}
            </div>
        </div>
        
    )
}


export default MyPage
