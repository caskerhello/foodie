import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { setFollowings } from '../../store/userSlice';

import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { VscFileMedia } from "react-icons/vsc";
import { VscFeedback } from "react-icons/vsc";
import { FcComments } from "react-icons/fc";

import { format, parseISO } from 'date-fns'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import '../../style/post.css';

const settings = {
    dot:false,
    arrows:false,
    infinite:false,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1
}

function PostFromMypage( props ) {

const [postid, setPostid] = useState();
const [images, setImages] = useState([]);
const [likeList, setLikeList ] = useState([]);
const [replyList, setReplyList] = useState([]);
const [loginUser, setLoginUser] = useState({});
let lUser = useSelector( state=>state.user );

const [ viewVal, setViewVal ] = useState(false)
const [ replyStyle, setReplyStyle] = useState({display:"none"})
const [replyContent, setReplyContent]  = useState('');
const [replyDate, setReplyDate]  = useState('');
const [followings, setFollowings2] = useState([]);
// const dispatch = useDispatch();
const navigate = useNavigate();

const formatDate = (dateString) => {
    const date = new Date(dateString); // ISO 8601 형식의 문자열을 Date 객체로 변환
    const day = String(date.getDate()).padStart(2, '0'); // 일 (2자리로 맞추기)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
    const year = String(date.getFullYear()).slice(-2); // 년 (끝 두 자리만 사용)
    
    const hours = String(date.getHours()).padStart(2, '0'); // 시간
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분
    
    return `${year}/${month}/${day} ${hours}h${minutes}m`;
}


useEffect(
    ()=>{
        
        axios.get(`/api/post/getImages/${props.modalPost.postid}` )
        .then((result)=>{ 
            
            setImages( result.data.imgList ); })
        .catch((err)=>{console.error(err)})            

        axios.get(`/api/post/getLikeList/${props.modalPost.postid}`)
        .then((result)=>{
            
                setLikeList( [...result.data.likeList ] );
        }).catch((err)=>{console.error(err)})

        axios.get(`/api/post/getReplyList/${props.modalPost.postid}`)
        .then((result)=>{
            
            let temp = [...result.data.replyList];
            
            setReplyList([...temp]);

            
        }).catch((err)=>{console.error(err)})

    },[  ]
)

async function onLike(){
    try{
        // 현재 로그인 유저의 닉네임과 현재 포스트의 id 로  like 작업
        // 현재 로그인 유저의 닉네임과 현재 포스트의 id 를 서버에 보내서 내역이 있으면 삭제 , 없으면 추가
        
        await axios.post('/api/post/addLike', { postid:props.modalPost.postid, memberid:lUser.memberid});

        // 현재 포스트의 라이크를 재조회하고 likeList 를 갱신 합니다
        const result = await axios.get(`/api/post/getLikeList/${props.modalPost.postid}`)
        setLikeList( result.data.likeList );
    }catch(err){
        console.error(err);
    }
}





useEffect(
    ()=>{
        if( !viewVal ){
            setReplyStyle({display:"none"})
        }else{
            setReplyStyle({display:"flex", margin:"5px 5px"})
        }
    },[viewVal]
);

function viewOrNot(){
    setViewVal( !viewVal );
}


async function addReply(){
    try{
        // 댓글을 추가하고 댓글 리스트를 재조회 및 갱신하세요
        await axios.post('/api/post/addReply', {memberid:lUser.memberid, content:replyContent, postid:props.modalPost.postid})
        const result = await axios.get(`/api/post/getReplyList/${props.modalPost.postid}`)
        setReplyList( result.data.replyList );
    }catch(err){
        console.error(err);
    }
    setReplyContent('');
}
async function deleteReply(id){
    
    if(window.confirm("댓글을 삭제하시겠습니까?")){
    try{
        // 댓글을 삭제하고 댓글 리스트를 재조회 및 갱신하세요
        await axios.delete(`/api/post/deleteReply/${id}`)
        const result = await axios.get(`/api/post/getReplyList/${props.modalPost.postid}`)
        setReplyList( result.data.replyList );
    }catch(err){
        console.error(err);
    }
    }

}

    return (
        <div className='postFromMypage' style={{width:"600px"}}>
            <div className='postProfile' >
            {/* style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}} */}
                <div style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}} ><span>#{props.modalPost.postid}&nbsp;{props.modalPost.nickname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatDate(props.modalPost.post_write_date)}</span><span><VscFileMedia style={{width:"0.5em"}} />{images.length}</span><span><button className={'modalCloseBtn'} onClick={() => props.setModalOpen(false)}>
                창닫기</button></span></div>
                
                {/* 객체.some( (변수)=>{} ) : 객체의 요소 하나하나를 한번씩  '변수'에 저장하고 익명함수를 반복실행합니다.
                대개는 익명함수에서 비교연산의 결과를 리턴하는데, 그결과가 모두 false 라면 최종 결과 false 이며, 리턴값중 하나라도  true 가 있으면 최종 결과는  true 입니다.  위 명령은 내가 팔로잉 하는 사람들들 현재 post 의 작성자가 있다면 true , 없다면 false 가 결과가 됩니다. */}
                {/* 글쓴이가 나이거나, 나의 팔로잉중에  글쓴이가 없다면..... */}
            </div>

            { <Slider {...settings} >
                {
                    (images)?(
                        images.map((img, idx)=>{
                            return (
                                <div>
                                    <div className='mainImg'>
                                    <img key={idx}  src={`${process.env.REACT_APP_ADDRESS2}/uploads/${img.savefilename}`} />
                                    </div>
                                </div>
                            )
                        })
                    ):(null)
                }
            </Slider>  }

            <div className='postButtonsAndContents' style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <span style={{width:"80px"}}>{
                    (likeList)?(
                        likeList.some(
                            (like)=>(lUser.memberid==like.memberid) 
                        )
                        ?
                        ( 
                            <VscHeartFilled style={{height:"20px",width:"20px",color:"red"}} onClick={ ()=>{ onLike() } }/>
                        
                        )
                        :
                        (
                        <VscHeart style={{height:"20px",width:"20px"}} onClick={ ()=>{ onLike() } }/>
                        
                        )
                    ):(
                        <VscHeart style={{height:"20px",width:"20px"}} onClick={ ()=>{ onLike() } }/>
                        
                    )
                }{likeList.length}&nbsp;&nbsp;&nbsp;
                
                <FcComments style={{height:"20px",width:"20px"}} onClick={()=>{
                    viewOrNot()}} />
                
                {replyList.length}</span>
                
                <span>{props.modalPost.post_content}★{props.modalPost.post_stars}&nbsp;</span> 
                
                <span>
                    <div className='content' style={{display:"block"}}>{props.modalPost.place_name}★{Math.floor(props.modalPost.place_ave_stars * 10) / 10}</div>
                </span>
            </div>
            

            <div className='postReply'> 

                {
                    (replyList && replyList.length>=1)?(
                        replyList.map((reply, idx)=>{
                            return (
                                <div key={idx} style={replyStyle}>
                                    <div style={{flex:"1", fontWeight:"bold"}} className='postReplyContents'>{reply.nickname}&nbsp;</div>
                                    <div style={{flex:"3"}} className='postReplyContents'>{reply.reply_content}</div>
                                    <div style={{flex:"1", fontWeight:"bold"}} className='postReplyContents'>{formatDate(reply.writedate)}&nbsp;</div>
                                    <div style={{flex:"1", textAlign:"right"}}>
                                        {
                                            (reply.memberid==lUser.memberid)?(
                                                <button className='postReplyContents' onClick={ ()=>{ deleteReply(reply.replyid)  } } style={{width:"100%"}}>삭제</button>
                                            ):(null)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    ):(<div style={replyStyle} className='postReplyContents'>아직 댓글이 없습니다</div>)
                }
                <div style={replyStyle}>
                    <input type="text" style={{flex:"5"}} value={replyContent} onChange={
                        (e)=>{ setReplyContent( e.currentTarget.value) }
                    }/>
                    <button style={{flex:"1"} } className='postReplyContents' onClick={
                        ()=>{  addReply() }
                    }>댓글입력</button>
                </div>
            </div>
        </div>
    )
}

export default PostFromMypage
