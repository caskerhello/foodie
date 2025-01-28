import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { FcPicture } from "react-icons/fc";
import { VscFeedback } from "react-icons/vsc";

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MainMenu from '../MainMenu';

import '../../style/postone.css';

import jaxios from '../../util/jwtUtil';


const settings = {
    dot:false,
    arrows:false,
    infinite:false,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1
}

function PostOne() {
    const [ post, setPost ] =useState({});
    const [ images, setImages] =useState([]);
    const [ likeList, setLikeList ] = useState([]);
    const [ replyList, setReplyList] = useState([]);

    const [ word, setWord] = useState('');

    const [ viewVal, setViewVal ] = useState(false)
    const [ replyStyle, setReplyStyle] = useState({display:"none"})
    const [ replyContent, setReplyContent]  = useState('');

    const navigate = useNavigate();
    const {postid} = useParams();
    const loginUser = useSelector( state=>state.user );
    const lUser = useSelector( state=>state.user );

    useEffect(
        ()=>{
            // 포스트
            jaxios.get(`/api/post/getPost/${postid}`)
            .then((result)=>{
                console.log(result.data)
                setPost( result.data )
            })
            .catch((err)=>{console.error(err)})

            // 이미지
            jaxios.get(`/api/post/getImages/${postid}` )
            .then((result)=>{ setImages( result.data.imgList );
                console.log(result.data.imgList)
            })
            .catch((err)=>{console.error(err)})

            // // 댓글
            jaxios.get(`/api/post/getReplyList/${postid}`)
            .then((result)=>{ setReplyList( result.data.replyList ); })
            .catch((err)=>{console.error(err)})

            // // 좋아요
            jaxios.get(`/api/post/getLikeList/${postid}` )
            .then((result)=>{ setLikeList( result.data.likeList ); })
            .catch((err)=>{console.error(err)})
        },[]
    )

    const formatDate = (dateString) => {
        const date = new Date(dateString); // ISO 8601 형식의 문자열을 Date 객체로 변환
    
        const day = String(date.getDate()).padStart(2, '0'); // 일 (2자리로 맞추기)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
        const year = String(date.getFullYear()).slice(-2); // 년 (끝 두 자리만 사용)
        
        const hours = String(date.getHours()).padStart(2, '0'); // 시간
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 분
        
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    async function onLike(){
        try{
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id 로  like 작업
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id 를 서버에 보내서 내역이 있으면 삭제 , 없으면 추가
            await jaxios.post('/api/post/addLike', {postid:postid, memberid:loginUser.memberid} );

            // 현재 포스트의 라이크를 재조회하고 likeList 를 갱신 합니다
            const result = await jaxios.get(`/api/post/getLikeList/${postid}` )
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
                setReplyStyle({display:"flex", margin:"5px 5px",marginBottom:"10px"})
            }
        },[viewVal]
    );

    function viewOrNot(){
        setViewVal( !viewVal );
    }

    async function addReply(){
        try{
            // 댓글을 추가하고 댓글 리스트를 재조회 및 갱신하세요
            await jaxios.post('/api/post/addReply', {memberid:loginUser.memberid, content:replyContent, postid})

            const result = await jaxios.get(`/api/post/getReplyList/${postid}`)
            setReplyList( result.data.replyList );
        }catch(err){
            console.error(err);
        }
        setReplyContent('');
    }

    async function deleteReply(id){
        try{
            // 댓글을 삭제하고 댓글 리스트를 재조회 및 갱신하세요
            await jaxios.delete(`/api/post/deleteReply/${id}`)
            const result = await jaxios.get(`/api/post/getReplyList/${postid}`)
            setReplyList( result.data.replyList );
        }catch(err){
            console.error(err);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // -1은 이전 페이지로 돌아가는 의미
    };
    
    return (
        <div className='postOneContainer'>
            <MainMenu setWord={setWord}/>

            <div className='postOne'>
                <div className='title'>
                    <div className='titleRow'>
                        <span style={{
                            display:'flex', justifyContent:'center', alignItems:'center',
                            lineHeight:'0.5',
                            // border:'2px solid black', borderRadius:'10px',
                        }}>#{post.postid}&nbsp;
                        
                        <span style={{
                            display:'flex', justifyContent:'center', alignItems:'center',
                            lineHeight:'0.7'}}>

                            <img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${post.profileimg}`}/>{post.nickname}</span> &nbsp;
                        
                            {formatDate(post.post_write_date)}
                        </span>
                        
                        <span style={{
                            display:'flex', justifyContent:'center', alignItems:'center',
                            lineHeight:'0.5'}}>
                        <FcPicture style={{width:'0.6em', lineHeight:'0.5'}} />
                        {images.length}
                        </span>
    
                    </div>
                </div>

                {Array.isArray(images) && images.length > 0 ? (
                <Slider {...settings}>
                    {images.map((img, idx) => (
                        <div key={idx}>
                            <div className="imgs">
                                <img
                                    src={`${process.env.REACT_APP_ADDRESS2}/uploads/${img.savefilename}`}
                                    alt={`Image ${idx}`}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
                ) : (
                <p>No images available</p>
                )}


                {/* {
                <Slider {...settings} >
                    {
                        (Array.isArray(images) && images.length > 0 )?(
                            images.map((img, idx)=>{

                            return (
                                <div key={idx}>
                                    <div className='imgs' >
                                        <img  src={`${process.env.REACT_APP_ADDRESS2}/uploads/${img.savefilename}`}/>
                                    </div>
                                </div>
                            )

                            })
                        )
                        :("Loading...")
                    }
                </Slider>
                } */}
                
                <div className='contents1'>
                    {post.post_content}
                </div>
                
                <div className='contents2'>
                    <span>{
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
                        <VscFeedback style={{height:"20px",width:"20px"}} onClick={()=>{
                            viewOrNot()}}/>
                        {replyList.length}&nbsp;
                    </span>
                    
                    <span>
                        <span style={{fontSize:'1.4em'}}>★</span>
                        <span>{post.post_stars}</span>&nbsp;
                    </span>

                    <span>
                        <div className='content' style={{display:"block"}}></div>
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
            <div className='postOneBottom'>
                <button onClick={handleGoBack}> 뒤로가기 </button>
            </div>
        </div>
    )
}

export default PostOne
