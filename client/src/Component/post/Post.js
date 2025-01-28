import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { setFollowings } from '../../store/userSlice';

import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { FcPicture } from "react-icons/fc";
import { FcGallery } from "react-icons/fc";
import { FcComments } from "react-icons/fc";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import '../../style/post.css';

import jaxios from '../../util/jwtUtil';

const settings = {
    dot:false,
    arrows:false,
    infinite:false,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1
}

function Post( props ) {
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
        
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    
    useEffect(
        ()=>{
            jaxios.get(`/api/post/getImages/${props.post.postid}` )
            .then((result)=>{
                setImages( result.data.imgList ); })
            .catch((err)=>{console.error(err)})

            jaxios.get(`/api/post/getLikeList/${props.post.postid}`)
            .then((result)=>{
                setLikeList( [...result.data.likeList ] );
            }).catch((err)=>{console.error(err)})

            jaxios.get(`/api/post/getReplyList/${props.post.postid}`)
            .then((result)=>{
                let temp = [...result.data.replyList];
                setReplyList([...temp]);
            }).catch((err)=>{console.error(err)})

        },[ ]
    )

    async function onLike(){
        try{
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id 로  like 작업
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id 를 서버에 보내서 내역이 있으면 삭제 , 없으면 추가
            
            await jaxios.post('/api/post/addLike', { postid:props.post.postid, memberid:lUser.memberid});

            // 현재 포스트의 라이크를 재조회하고 likeList 를 갱신 합니다
            const result = await jaxios.get(`/api/post/getLikeList/${props.post.postid}`)
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
            await jaxios.post('/api/post/addReply', {memberid:lUser.memberid, content:replyContent, postid:props.post.postid})
            const result = await jaxios.get(`/api/post/getReplyList/${props.post.postid}`)
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
            await jaxios.delete(`/api/post/deleteReply/${id}`)
            const result = await jaxios.get(`/api/post/getReplyList/${props.post.postid}`)
            setReplyList( result.data.replyList );
        }catch(err){
            console.error(err);
        }
        }
    }

    return (
        <div className='post' style={{width:"600px"}} key={props.idx}>
            <div className='title'>
                <div className='titleRow'>
                    <span style={{
                        display:'flex', justifyContent:'center', alignItems:'center',
                        lineHeight:'0.5', 
                        // border:'2px solid black', borderRadius:'10px',
                    }}>#{props.post.postid}&nbsp;
                    
                    <span style={{
                        display:'flex', justifyContent:'center', alignItems:'center',
                        lineHeight:'0.7'}} onClick={()=>{
                        props.getProfile(props.post.memberid);
                        props.setModalOpen(true);
                    }}>
                        <img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${props.post.profileimg}`}/>{props.post.nickname}</span> &nbsp;
                    
                        {formatDate(props.post.post_write_date)}
                    </span>
                    
                    <span style={{
                        display:'flex', justifyContent:'center', alignItems:'center',
                        lineHeight:'0.5'}}>
                    <FcPicture style={{width:'0.6em', lineHeight:'0.5'}} />
                    {images.length}</span>

                </div>
                
            </div>

            { <Slider {...settings} >
                {
                    (images)?(
                        images.map((img, idx)=>{
                            return (
                                <div className='mainimg'>
                                    <img key={idx}  src={`${process.env.REACT_APP_ADDRESS2}/uploads/${img.savefilename}`} width="500" height="500"/>
                                </div>
                            )
                        })
                    ):(null)
                }
            </Slider>  }

            <div className='contents1' style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                
                <span style={{width:"100px"}}>
                    {
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
                    }
                    {likeList.length}&nbsp;&nbsp;&nbsp;
                
                    <FcComments style={{height:"20px",width:"20px"}} onClick={()=>{
                        viewOrNot()}} />
                    
                    {replyList.length}
                </span>
                
                <span style={{width:"400px",fontSize:"80%"}}>
                    {props.post.post_content}★{props.post.post_stars}&nbsp;
                </span>
                
                <span style={{width:"100px"}}>
                    <div className='content' style={{fontSize:"70%"}}>
                        {props.post.place_name}★{Math.floor(props.post.place_ave_stars * 10) / 10}
                    </div>
                    <button style={{ flex: "1" }} onClick={() => {
                        if (props.viewMapOrNot === true) {
                            props.onChangeMapView();}
                        props.findRestorantLocation(props.post.placeid);
                    }}>위치
                    </button>
                </span>
            </div>

            <div className='reply'>
                {
                    (replyList && replyList.length>=1)?(
                        replyList.map((reply, idx)=>{
                            return (
                                <div key={idx} style={replyStyle}>
                                    <div style={{flex:"1", fontWeight:"bold"}}>{reply.nickname}&nbsp;</div>
                                    <div style={{flex:"3"}}>{reply.reply_content}</div>
                                    <div style={{flex:"1", fontWeight:"bold"}}>{formatDate(reply.writedate)}&nbsp;</div>
                                    <div style={{flex:"1", textAlign:"right"}}>
                                    {
                                        (reply.memberid==lUser.memberid)?(
                                            <button onClick={ ()=>{ deleteReply(reply.replyid)  } } style={{width:"100%"}}>삭제</button>
                                        ):(null)
                                    }
                                    </div>
                                </div>
                            )
                        })
                    ):(<div style={replyStyle}>아직 댓글이 없습니다</div>)
                }

                <div style={replyStyle}>
                    <input type="text" style={{flex:"5"}} value={replyContent} onChange={
                        (e)=>{ setReplyContent( e.currentTarget.value) }
                    }/>
                    <button style={{flex:"1"}} onClick={
                        ()=>{  addReply() }
                    }>댓글입력</button>
                </div>
            </div>
        </div>
    )
}

export default Post
