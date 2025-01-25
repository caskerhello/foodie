import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainMenu from '../MainMenu';
import { useNavigate } from "react-router-dom";

import '../../style/getplace.css'

const GetPlace = () => {
const { searchPlace } = useParams();  // URL 파라미터에서 searchPlace 값 가져오기
console.log(searchPlace);
const [placeList, setPlaceList] = useState();
const [placeListLength, setPlaceListLength] = useState();

const [postList, setPostList] = useState();
const [postListLength, setPostListLength] = useState();

const [word, setWord] = useState('')
const navigate=useNavigate();

const [modalOpen, setModalOpen] = useState(false);
const modalBackground = useRef();

useEffect(() => {
    axios.get(`/api/place/getPlaceList`, {params:{searchPlace}})
        .then((result)=>{
            setPlaceList( result.data.placeList );
            setPlaceListLength(result.data.placeList.length);
            setPostList("")
            setPostListLength("")

        }).catch((err)=>{console.error(err)})
}, [searchPlace]);



async function findPostList(placeid){

    await axios.get(`/api/post/findPost`,{params:{placeid}})
    .then((result)=>{
        
    setPostList( result.data.postList );
    setPostListLength(result.data.postList.length);
    setModalOpen(true)
    }
    ).catch((err)=>{console.error(err)})
}

    
return (
    <div>
        <MainMenu setWord={setWord} />
            
            <h1>{searchPlace}의 장소 정보</h1>
            {
                (!placeListLength==0)?(
                    placeList.map((place, idx)=>{
                        return (
                            <div key={idx}>
                                장소명 : {place.placeName} <br/>
                                리뷰수 : {place.reviewamount} <br/>
                                평균별점 : {place.avestars} <br/>
                                카테고리 : {place.category} <br/>
                                도로명주소 : {place.road_address_name} <br/>
                                전화번호 : {place.phone} <br/>
                                <button 
                                onClick={()=>{window.open(place.place_url, "_blank");}}
                                >상세정보</button><br/>

                                
                                <button 
                                onClick={()=>{findPostList(place.placeid)}}
                                >리뷰보기</button>
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
                
                <p>검색 결과가 조회됩니다<button className={'modalCloseBtn'} onClick={() => setModalOpen(false)}>
                창닫기
                </button></p>
                
        {(postListLength)?
        (
            postList.map((post, idx)=>{
                return (
                    <div key={idx} >
                        닉네임: {post.nickname} <br/>
                        포스팅내용 : {post.post_content} <br/>
                        평균별점 : {post.post_stars} <br/>
                        포스팅일자 : {post.post_write_date}<br/>
                        
                        <button
                        onClick={
                            ()=>{ navigate(`/postOne/${postList[idx].postid}`) }
                        }
                        >리뷰상세보기</button> <br/>
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

export default GetPlace
