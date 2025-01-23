import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MainMenu from '../MainMenu';
import { useSelector } from 'react-redux';

import '../../style/mypage.css'

const MyPage = () => {
    const [ imgSrc, setImgSrc ]=useState();
    const [ followers, setFollowers] = useState([]);  // 나를 follow 하는 사람들
    const [ followings, setFollowings ] = useState([]);   // 내가 following 하는 사람들
    const [ postList, setPostList ] = useState([]);  // 로그인 유저가 작성한 포스트들
    const [ imgList, setImgList] = useState([]);   // 하단에 포스트를 대변할 수 있는 이미지들
    // const [loginUser, setLoginUser] = useState({});
    const lUser = useSelector( state=>state.user );
    const [ word, setWord ] = useState('');

    const navigate=useNavigate();

    useEffect(
        ()=>{
            // console.log("loginUser.profileimg :"+lUser.profileimg)

            if( lUser.profileimg ){
                setImgSrc(lUser.profileimg)
            }
            
            axios.get('/api/member/getMyPost')
            .then((result)=>{
                console.log(result.data.postList)

                console.log(result.data.imgList)
                setPostList([...result.data.postList])

                setImgList( [...result.data.imgList] );
            }).catch((err)=>{console.error(err)})

        },[]
    )


    return (
        <div className='mypageContainer'>
            <div className='mypage'>
                <MainMenu setWord={setWord} />

                <div className='title'>내 정보</div>
                

                <div className='userinfo'>
                    
                    <div className='img'>
                        <img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${imgSrc}`} />
                        {/* <img src={imgSrc} /> */}
                    </div>
                    <div className='profile'>
                        <div className='field'>
                            <div className='title'><label>이메일</label></div>
                            
                            <div className='content'><div>{lUser.email}</div></div>
                            
                        </div>
                        <div className='field'>
                            <div className='title'><label>닉네임</label></div>
                            
                            <div className='content'><div>{lUser.nickname}</div></div>
                            {/* <label>닉네임</label>
                            <div>{lUser.nickname}</div> */}
                        </div>
                        {/* <div className='field'>
                            <div className='title'><label>팔로워</label></div>
                            
                            <div className='content'><div>{lUser.nickname}</div></div>

                            <label>팔로워</label>
                            <div>{ (lUser.Followers)?(lUser.Followers.length):(0) }</div>
                        </div>
                        <div className='field'>
                            <div className='title'><label>팔로잉</label></div>
                            
                            <div className='content'><div>{lUser.nickname}</div></div>

                            <label>팔로잉</label>
                            <div>{ (lUser.Followings)?(lUser.Followings.length):(0) }</div>
                        </div> */}
                        <div className='field'>
                            <div className='title'><label>소개</label></div>
                            
                            <div className='content'><div>{lUser.profilemsg}</div></div>

                            
                        </div>
                    </div>
                </div>
                <div className='btns' >
                    <button onClick={()=>{navigate('/editProfile')}}>프로필 수정</button>
                    {/* <button>팔로우/팔로워</button> */}
                    <button>북마크</button>
                </div>
                <div className='userpost' >
                    
                    {/* 한줄에 세개씩 이미지를 적당한 크기로 나열해주세요. 필요하다면  css 수정도 해주세요 */}
                    {
                        (imgList)?(
                            imgList.map((imgs, idx)=>{
                                return (
                                    <div key={idx} 
                                    
                                    onClick={
                                        // ()=>{ navigate(`/postOne`) }
                                        ()=>{ navigate(`/postOne/${postList[idx].postid}`) }
                                    }
                                    >
                                        <img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${imgs}`} />
                                    </div>
                                )
                            })
                        ):(null)
                        
                    }
                </div>
            </div>
       </div> 
    )
    
}


export default MyPage
