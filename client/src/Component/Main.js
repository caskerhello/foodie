import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MainMenu from './MainMenu';
import Post from './post/Post';
import { Map } from "react-kakao-maps-sdk";

// import '../style/main.css';

const Main = () => {
    const [loginUser, setLoginUser] = useState({});
    const [postList, setPostList ] = useState([]);
    const [paging, setPaging] = useState({});
    const [word, setWord] = useState(null);

    const navigate = useNavigate();    
    
 
  return (
    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
          <div style={{border:"1px solid black", height:"600px", width:"800px"}}>
            <MainMenu setWord={setWord} />

            <div className='Posts' style={{border:"1px solid black", height:"600px", width:"600px"}}>

              포스트 loading...
                {/* {
                    (postList)?(
                        postList.map((post, idx)=>{
                            return (

                                <Post key={idx} post={post} postid={post.id} loginUser={loginUser}/>

                            )
                        })
                    ):(null)
                } */}
            </div>
            </div>

            <div>
            <Map 
                center={{ lat: 37.5718987, lng: 126.9872482 }}   // 지도의 중심 좌표
                style={{ position: 'fixed', top:'4%',right:'1%',width: '400px', height: '300px',borderRadius: '20px',boxShadow: '0 0 10px' }} // 지도 크기
                level={4}                                   // 지도 확대 레벨
            >
            </Map>
            {/* <KakaoMap /> */}
            </div>

            

        </div>
  )
}

export default Main
