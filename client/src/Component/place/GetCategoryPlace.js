import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainMenu from '../MainMenu';
import { useNavigate } from "react-router-dom";

import '../../style/getcategoryplace.css'

const GetCategoryPlace = () => {
const { category } = useParams();

const [placeList, setPlaceList] = useState();
const [placeListLength, setPlaceListLength] = useState();

const [postList, setPostList] = useState();
const [postListLength, setPostListLength] = useState();

const [word, setWord] = useState('')
const navigate=useNavigate();

const [modalOpen, setModalOpen] = useState(false);
const modalBackground = useRef();


useEffect(() => {
    axios.get(`/api/place/getPlaceListByCategory`, {params:{category}})
          .then((result)=>{
            console.log("result.data.placeList : ",result.data.placeList)   
            console.log("result.data.placeList.length : ", result.data.placeList.length)
              setPlaceList( result.data.placeList );
              setPlaceListLength(result.data.placeList.length);
              setPostList("")
              setPostListLength("")

          }).catch((err)=>{console.error(err)})     
}, [category]);




async function findPostList(placeid){
    console.log("placeid"+placeid)

    await axios.get(`/api/post/findPost`,{params:{placeid}})
    .then((result)=>{
        console.log("result.data.postList : ", result.data.postList)   
        // console.log("result.data.postList.length : ", result.data.postList.length)
        setPostList( result.data.postList );
        setPostListLength(result.data.postList.length);
        setModalOpen(true)
    }

    ).catch((err)=>{console.error(err)}) }




  return (
    <div>

<MainMenu setWord={setWord} />
            <h1>장소 카테고리 : {category}</h1>                        
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
                    <div className={'getPlaceByCategoryModalContainer'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                    }}>
                    <div className={'getPlaceByCategoryModalContent'}>
                        
                        <p>검색 결과가 조회됩니다<button className={'modalCloseBtn'} onClick={() => setModalOpen(false)}>
                        창닫기
                        </button></p>
                        
                        {
                (postListLength)?
                (
                    postList.map((post, idx)=>{
                        return (
                            <div key={idx}
                            
                            
                            >
                                닉네임: {post.nickname} <br/>
                                포스팅내용 : {post.post_content} <br/>
                                평균별점 : {post.post_stars} <br/>
                                포스팅일자 : {post.post_write_date}<br/>
                                
                                <button
                                onClick={
                                    // ()=>{ navigate(`/postOne`) }
                                    ()=>{ navigate(`/postOne/${postList[idx].postid}`) }
                                }
                                >리뷰상세보기</button><br/>
                            </div>
                        )
                    })

                )   :

                ("?")
            }


                                              
                                            

                    </div>
                    </div>
                    }




            



            {/* {
                (postListLength)?
                (
                    postList.map((post, idx)=>{
                        return (
                            <div key={idx}>
                                포스팅내용 : {post.content} <br/>
                                평균별점 : {post.stars} <br/>
                                
                                <button 
                                onClick={
                                    // ()=>{ navigate(`/postOne`) }
                                    ()=>{ navigate(`/postOne/${postList[idx].postid}`) }
                                }
                                >리뷰상세보기</button><br/>
                            </div>
                        )
                    })

                )   :

                ("?")
            } */}









      
    </div>
  )
}

export default GetCategoryPlace
