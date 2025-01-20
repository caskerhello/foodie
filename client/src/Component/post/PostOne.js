import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { VscFileMedia } from "react-icons/vsc";
import { VscFeedback } from "react-icons/vsc";

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// import { format, parseISO } from 'date-fns'

import MainMenu from '../MainMenu';
import Post from './Post';


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

    const [ followings, setFollowings ] = useState([]);   
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
            axios.get(`/api/post/getPost/${postid}`)
            .then((result)=>{
                console.log(result.data)
                setPost( result.data )
            })
            .catch((err)=>{console.error(err)})


            // 이미지
            axios.get(`/api/post/getImages/${postid}` )
            .then((result)=>{ setImages( result.data.imgList ); })
            .catch((err)=>{console.error(err)})

            // // 댓글
            axios.get(`/api/post/getReplyList/${postid}`)
            .then((result)=>{ setReplyList( result.data.replyList ); })
            .catch((err)=>{console.error(err)})

            // // 좋아요
            axios.get(`/api/post/getLikeList/${postid}` )
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
        
        return `${year}/${month}/${day} ${hours}h${minutes}m`;
      }


    async function onLike(){
        try{
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id 로  like 작업
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id 를 서버에 보내서 내역이 있으면 삭제 , 없으면 추가
            await axios.post('/api/post/addlike', {postid:postid, memberid:loginUser.memberid} );

            // 현재 포스트의 라이크를 재조회하고 likeList 를 갱신 합니다
            const result = await axios.get(`/api/post/getLikeList/${postid}` )
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
                setReplyStyle({display:"flex", margin:"5px 5px",marginBottom:"100px"})
            }
        },[viewVal]
    );

    function viewOrNot(){
        setViewVal( !viewVal );
    }


    async function addReply(){
        try{
            // 댓글을 추가하고 댓글 리스트를 재조회 및 갱신하세요
            await axios.post('/api/post/addReply', {memberid:loginUser.memberid, content:replyContent, postid})

            const result = await axios.get(`/api/post/getReplyList/${postid}`)
            setReplyList( result.data.replyList );
        }catch(err){
            console.error(err);
        }
        setReplyContent('');
    }

    async function deleteReply(id){
        try{
            // 댓글을 삭제하고 댓글 리스트를 재조회 및 갱신하세요
            await axios.delete(`/api/post/deleteReply/${id}`)
            const result = await axios.get(`/api/post/getReplyList/${postid}`)
            setReplyList( result.data.replyList );
        }catch(err){
            console.error(err);
        }

    }

    // async function onFollow( writer ){
    //     try{
    //         await axios.post('/api/member/follow', {ffrom:loginUser.nickname, fto:writer} );
    //         const result = await axios.get('/api/member/getFollowings');
    //         setFollowings( result.data );
    //     }catch(err){
    //         console.error(err);
    //     }
    // }
    // const date = parseISO(post.writedate); // ISO 형식을 Date 객체로 변환
    // const formattedDate = format(date, 'yy-MM-dd HH시 mm분'); // 원하는 포맷으로 변환


    return (
        <div>
            <MainMenu setWord={setWord}/>
            {/* 해당 포스트 한개만  Main 에서 표시된 것처럼 표시하세요 */}
            
            <div className='post' style={{width:"780px"}}>
                <div className='writer' style={{display:"flex"}}>
                    <div style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}}><span>#{post.postid}&nbsp;{post.nickname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {formatDate(post.writedate)}
                        </span><span></span><span><VscFileMedia  />{images.length}</span></div>
                    {/* <div>{post.writer}&nbsp;&nbsp;</div> */}
                    {/* {
                        ( 
                            ( post.writer != loginUser.nickname) &&  
                            ( !followings.includes( post.writer) )
                        )?( <button onClick={()=>{onFollow(post.writer)}}>FOLLOW</button> ): (null)
                    } */}
                </div>
                { <Slider {...settings} >
                    {
                        (images)?(
                            images.map((img, idx)=>{
                                return (
                                    <img key={idx} src={`${process.env.REACT_APP_ADDRESS2}/uploads/${img.savefilename}`} width="750" height="900"/>
                                )
                            })
                        ):(null)
                    }
                </Slider>  }

                {/* <div className='like'>
                    {
                        (likeList)?( 
                            likeList.some(
                                (like)=>(loginUser.nickname==like.likenick) 
                            )
                            ?
                            ( <img src={`http://localhost:8070/images/delike.png`} onClick={ ()=>{ onLike() } } />)
                            :
                            (<img src={`http://localhost:8070/images/like.png`} onClick={ ()=>{ onLike() } }  />)
                        ):(
                            <img src={`http://localhost:8070/images/like.png`} onClick={ ()=>{ onLike() } }  />
                        )
                    }

                    &nbsp;&nbsp;
                    <img src={`http://localhost:8070/images/reply.png`} onClick={()=>{
                        viewOrNot()
                    }}/>
                </div> */}

                <div className='like' style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                <span>{
                                    (likeList)?( 
                                        likeList.some(
                                            (like)=>(lUser.memberid==like.memberid) 
                                        )
                                        ?
                                        ( 
                                            <VscHeartFilled style={{height:"20px",width:"20px",color:"red"}} onClick={ ()=>{ onLike() } }/>
                                        // <img src={`http://localhost:8070/images/delike.png`} onClick={ ()=>{ onLike() } } />
                                        )
                                        :
                                        (
                                        <VscHeart style={{height:"20px",width:"20px"}} onClick={ ()=>{ onLike() } }/>
                
                                        // <img src={`http://localhost:8070/images/like.png`} onClick={ ()=>{ onLike() } }  />
                                        )
                                    ):(
                                        <VscHeart style={{height:"20px",width:"20px"}} onClick={ ()=>{ onLike() } }/>
                
                                        // <img src={`http://localhost:8070/images/like.png`} onClick={ ()=>{ onLike() } }  />
                                    )
                                }{likeList.length}&nbsp;&nbsp;&nbsp;
                                <VscFeedback style={{height:"20px",width:"20px"}} onClick={()=>{
                                    viewOrNot()}}/>
                                {/* <img src={`http://localhost:8070/images/reply.png`} onClick={()=>{
                                    viewOrNot()
                                }}/> */}
                                {replyList.length}</span>
                                
                                <span>
                                {post.content}★{post.stars}&nbsp;</span> 
                                <span>
                            <div className='content' style={{display:"block"}}>
                                {/* {post.place_name} */}
                                </div></span></div>
                <div className='content' style={{fontWeight:"bold",marginBottom:"50px"}}></div>
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
        </div>
    )
}

export default PostOne
