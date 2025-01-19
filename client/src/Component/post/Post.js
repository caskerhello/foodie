import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { setFollowings } from '../../store/userSlice';

import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { VscFileMedia } from "react-icons/vsc";
import { VscFeedback } from "react-icons/vsc";

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

    const date = parseISO(props.post.post_write_date); // ISO 형식을 Date 객체로 변환
    const formattedDate = format(date, 'yy-MM-dd HH시 mm분'); // 원하는 포맷으로 변환

    const formatDate = (dateString) => {
        const date = new Date(dateString); // ISO 8601 형식의 문자열을 Date 객체로 변환
      
        const day = String(date.getDate()).padStart(2, '0'); // 일 (2자리로 맞추기)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
        const year = String(date.getFullYear()).slice(-2); // 년 (끝 두 자리만 사용)
        
        const hours = String(date.getHours()).padStart(2, '0'); // 시간
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 분
        
        return `${year}/${month}/${day} ${hours}h${minutes}m`;
      }

    
    // const date1 = parseISO(replyList); // ISO 형식을 Date 객체로 변환
    // const formattedDate1 = format(date1, 'yyMMdd HH/mm분'); // 원하는 포맷으로 변환

    useEffect(
        ()=>{
            //console.log("Post.js")
            // setFollowings2([...lUser.Followings]);

            // console.log("post:",props.post)
            // console.log("poststring",JSON.stringify(props.post.postid))

            axios.get(`/api/post/getImages/${props.post.postid}` )
            .then((result)=>{ 
                // console.log("result.data.images"+result.data.imgList);
                setImages( result.data.imgList ); })
            .catch((err)=>{console.error(err)})            

            axios.get(`/api/post/getLikeList/${props.post.postid}`)
            .then((result)=>{
                // console.log("result.data.likeList:"+result.data.likeList)
                 setLikeList( [...result.data.likeList ] );
            }).catch((err)=>{console.error(err)})

            axios.get(`/api/post/getReplyList/${props.post.postid}`)
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
            // console.log(props.post.postid,lUser.nickname, lUser.memberid)
            await axios.post('/api/post/addlike', { postid:props.post.postid, memberid:lUser.memberid});

            // 현재 포스트의 라이크를 재조회하고 likeList 를 갱신 합니다
            const result = await axios.get(`/api/post/getLikeList/${props.post.postid}`)
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
            await axios.post('/api/post/addReply', {memberid:lUser.memberid, content:replyContent, postid:props.post.postid})
            const result = await axios.get(`/api/post/getReplyList/${props.post.postid}`)
            setReplyList( result.data.replyList );
        }catch(err){
            console.error(err);
        }
        setReplyContent('');
    }
    async function deleteReply(id){
        // console.log("deleteReplyid"+id);
        try{
            // 댓글을 삭제하고 댓글 리스트를 재조회 및 갱신하세요
            await axios.delete(`/api/post/deleteReply/${id}`)
            const result = await axios.get(`/api/post/getReplyList/${props.post.postid}`)
            setReplyList( result.data.replyList );
        }catch(err){
            console.error(err);
        }

    }

    return (
        <div className='Post' style={{width:"600px"}}>
            <div className='writer' >
            {/* style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}} */}
                <div style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}} ><span>#{props.post.postid}&nbsp;{props.post.nickname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formattedDate}</span><span></span><span><VscFileMedia  />{images.length}</span></div>
                {/* <div onClick={()=>{navigate(`/memberPage/${props.post.writer}`)}}>{props.post.writer}&nbsp;&nbsp;</div> */}
                {
                    // ( 
                    //     ( props.post.writer != lUser.nickname) 
                    //     &&  
                    //     ( !followings.some( (following)=>{  return following.fto == props.post.writer  } ) )
                    // )?( <button onClick={()=>{ onFollow(props.post.writer)} }>FOLLOW</button> ): (null)
                }
                {/* 객체.some( (변수)=>{} ) : 객체의 요소 하나하나를 한번씩  '변수'에 저장하고 익명함수를 반복실행합니다.
                대개는 익명함수에서 비교연산의 결과를 리턴하는데, 그결과가 모두 false 라면 최종 결과 false 이며, 리턴값중 하나라도  true 가 있으면 최종 결과는  true 입니다.  위 명령은 내가 팔로잉 하는 사람들들 현재 post 의 작성자가 있다면 true , 없다면 false 가 결과가 됩니다. */}
                {/* 글쓴이가 나이거나, 나의 팔로잉중에  글쓴이가 없다면..... */}
            </div>
            { <Slider {...settings} >
                {
                    (images)?(
                        images.map((img, idx)=>{
                            return (
                                <div className='mainimg'>
                                <img key={idx}  src={`http://localhost:8070/uploads/${img.savefilename}`} width="750" height="900"/>
                                </div>
                            )
                        })
                    ):(null)
                }
            </Slider>  }

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
                {props.post.post_content}★{props.post.post_stars}&nbsp;</span> 
                <span>
            <div className='content' style={{display:"block"}}>{props.post.place_name}</div>
            <button style={{flex:"1"}} onClick={
                        ()=>{ 
                            props.findRestorantLocation(props.post.placeid)                               
                        }
                    }>위치</button></span>
            </div>
            {/* <div className='like'>
                {
                    (likeList && likeList.length>=1)?(
                        <span>{likeList.length} 명이 좋아합니다</span>
                    ):(
                        <span>아직 "좋아요"가 없어요</span>
                    )
                }
                
            </div> */}

            {/* <div className='content'>{props.post.content} ★{props.post.stars}&nbsp;
            <button style={{flex:"1"}} onClick={
                        ()=>{ 
                            props.findRestorantLocation(props.post.placeid)                               
                        }
                    }>음식점 위치</button>

            </div> */}
            <div className='content'></div>
            
            <div className='content'> 
                
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
