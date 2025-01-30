import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { useNavigate, useParams  } from "react-router-dom";
import MainMenu from '../MainMenu';
import PostFromMypage from '../post/PostFromMypage';
import { useSelector } from 'react-redux';

import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { VscFileMedia } from "react-icons/vsc";
import { IoMdPhotos } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import '../../style/mypage.css'

import jaxios from '../../util/jwtUtil';

const MyPage = () => {
const [ imgSrc, setImgSrc ]=useState();
const [ followers, setFollowers] = useState([]);  // 나를 follow 하는 사람들
const [ followings, setFollowings ] = useState([]);   // 내가 following 하는 사람들
const [ postList, setPostList ] = useState([]);  // 로그인 유저가 작성한 포스트들
const [ imgList, setImgList] = useState([]);   // 하단에 포스트를 대변할 수 있는 이미지들
// const [loginUser, setLoginUser] = useState({});
const lUser = useSelector( state=>state.user );
const [ word, setWord ] = useState('');

const [ post, setPost ] =useState({});
const [ modalPost, setModalPost ] =useState({});
const [ images, setImages] =useState([]);
const [ likeList, setLikeList ] = useState([]);
const [ replyList, setReplyList] = useState([]);

const navigate=useNavigate();

const [modalOpen, setModalOpen] = useState(false);
const modalBackground = useRef();

useEffect(
    ()=>{
        if( lUser.profileimg ){
            setImgSrc(lUser.profileimg)
        }
        
        jaxios.get('/api/member/getMyPost', {params:{memberid:lUser.memberid}})
        .then((result)=>{
        setPostList([...result.data.postList])
        setImgList( [...result.data.imgList] );
        }).catch((err)=>{console.error(err)})
    },[]
)

async function myPageModalOpen(postid) {
    try {
        const result = await jaxios.get(`/api/post/getPost/${postid}`);
        console.log(result.data);
        setModalPost(result.data);
    } catch (err) {
        console.error(err);
    }
    setModalOpen(true);
}

return (
    <div className='mypageContainer'>
        <div className='mypage'>
            <MainMenu setWord={setWord} />

            <div className='title'>내 정보</div>

            <div className='userinfo'>
                <div className='img'>
                    <img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${imgSrc}`} />
                    
                </div>
                <div className='profile'>
                    <div className='field'>
                        <div className='title'><label>이메일</label></div>
                        <div className='content'><div>{lUser.email}</div></div>
                    </div>
                    <div className='field'>
                        <div className='title'><label>닉네임</label></div>
                        <div className='content'><div>{lUser.nickname}</div></div>
                    </div>
                    
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
                                    ()=>{ myPageModalOpen(`${postList[idx].postid}`) }
                                }
                                >
                                    <img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${imgs}`} />
                                </div>
                            )
                        })
                    ):(null)
                    
                }
            </div>

            {
                modalOpen &&
                <div className={'getMypageModalContainer'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false); }
                }}>
                    <div className={'getMypageModalContent'}>
                        <div className='getMypageModalTitle'>                        
                            
                        <br/>
                        </div>
                            <PostFromMypage modalPost={modalPost} setModalOpen={setModalOpen}
                            />
                    </div>
                </div>
            }
        </div>
    </div>
)
    
}


export default MyPage
