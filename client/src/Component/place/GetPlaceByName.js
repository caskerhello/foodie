import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainMenu from '../MainMenu';
import { useNavigate } from "react-router-dom";

import '../../style/getplacebyname.css'

import jaxios from '../../util/jwtUtil';

const GetPlaceNyName = () => {
const { searchPlace } = useParams();  // URL 파라미터에서 searchPlace 값 가져오기



function defineCategory(category){

    const categories = ["", "한식", "양식", "중식", "일식", "후식"];
    const categoryIndex = Number(category); // category를 숫자로 변환
    const categoryName1 = categories[categoryIndex]
    // const [categoryName1, setCategoryName1] = useState(categories[categoryIndex]);

    return categoryName1

}


const [isVisible, setIsVisible] = useState(true);

const [placeList, setPlaceList] = useState();
const [placeListLength, setPlaceListLength] = useState();

const [postList, setPostList] = useState();
const [postListLength, setPostListLength] = useState();

const [word, setWord] = useState('')
const navigate=useNavigate();

const [modalOpen, setModalOpen] = useState(false);
const modalBackground = useRef();

useEffect(() => {
    jaxios.get(`/api/place/getPlaceList`, {params:{searchPlace}})
        .then((result)=>{
            setPlaceList( result.data.placeList );
            setPlaceListLength(result.data.placeList.length);
            setPostList("")
            setPostListLength("")

        }).catch((err)=>{console.error(err)})
}, [searchPlace]);

useEffect(() => {
    // setCategoryName1(categories[categoryIndex]);

    // Show the message for 5 seconds after category change
    setIsVisible(true);
    const timer = setTimeout(() => {
    setIsVisible(false);
    }, 2000);

    // Clean up the timer on component unmount or category change
    return () => clearTimeout(timer);
}, [searchPlace]); // category가 바뀔 때마다 실행



async function findPostList(placeid){

    await jaxios.get(`/api/post/findPost`,{params:{placeid}})
    .then((result)=>{
        
    setPostList( result.data.postList );
    setPostListLength(result.data.postList.length);
    setModalOpen(true)
    }
    ).catch((err)=>{console.error(err)})
}

const formatDate = (dateString) => {
    const date = new Date(dateString); // ISO 8601 형식의 문자열을 Date 객체로 변환

    const day = String(date.getDate()).padStart(2, '0'); // 일 (2자리로 맞추기)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
    const year = String(date.getFullYear()).slice(-2); // 년 (끝 두 자리만 사용)
    
    const hours = String(date.getHours()).padStart(2, '0'); // 시간
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분
    
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

    
return (
    <div className='getPlaceByNameContainer'>
        <MainMenu setWord={setWord} />
            {isVisible && (
                    <div className={`getPlaceByNameTitle ${isVisible ? "show" : ""}`}>
                    "{searchPlace}"의 장소 정보<br></br>
                    조회된 자료 갯수는 "{placeListLength}"개 입니다.
                    </div>
                )}
            
            <h1></h1>
            {
                (!placeListLength==0)?(
                    placeList.map((place, idx)=>{
                        return (
                            <div key={idx} className='placeContainer' >

                                <div className='left'>
                                {place.placeName} <br/>
                                ★{place.avestars} <br/>
                                </div>


                                <div className='right'>
                                    <div className='placeContents'>
                                        카테고리 : {defineCategory(place.category)} <br/>
                                        리뷰수 : {place.reviewamount} <br/>
                                        도로명주소 : {place.road_address_name} <br/>
                                        전화번호 : {place.phone} <br/>
                                    </div>
                                <div className='btns'>
                                    <button
                                    onClick={()=>{window.open(place.place_url, "_blank");}}
                                    >상세정보</button><br/>
                                    &nbsp;
                                    <button
                                    onClick={()=>{findPostList(place.placeid)}}
                                    >리뷰보기</button>
                                </div>

                                </div>
                            </div>
                        )
                    })
                ):("검색 결과가 존재하지 않습니다.")
            }

        {
            modalOpen &&
            <div className={'getPlaceByNameModalContainer'} ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current) {
                    setModalOpen(false);
                }
            }}>
            <div className={'getPlaceByNameModalContent'}>
                <div className='getPlaceByNameModalContentTitle'>
                <button className={'modalCloseBtn'} onClick={() => setModalOpen(false)}>
                X
                </button>
                </div>
        {(postListLength)?
        (
            postList.map((post, idx)=>{
                return (
                    <div key={idx} className='post'>
                        <div className='postTitle'>
                            <div>
                            {post.nickname} ★{post.post_stars} {formatDate(post.post_write_date)} <br/> </div>
                            <div>
                            <button
                            onClick={
                                ()=>{ navigate(`/postOne/${postList[idx].postid}`) }
                            }
                            >리뷰상세보기</button></div>
                        </div>
                        
                        <div>{post.post_content}  <br/>
                        </div>
                        
                        <br/>

                    </div>
                )
            })
        )   :
        ("?")}
        
            </div>
        </div>
        }

    </div>
)
}

export default GetPlaceNyName
