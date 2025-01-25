import React, {useState, useEffect, useMemo} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainMenu from '../MainMenu';
import { useNavigate } from "react-router-dom";

const GetPlace = () => {
    const { searchPlace } = useParams();  // URL 파라미터에서 searchPlace 값 가져오기
    console.log(searchPlace);
    const [placeList, setPlaceList] = useState();
    const [placeListLength, setPlaceListLength] = useState();

    const [postList, setPostList] = useState();
    const [postListLength, setPostListLength] = useState();

    const [word, setWord] = useState('')
    const navigate=useNavigate();

    useEffect(() => {
        axios.get(`/api/place/getPlaceList`, {params:{searchPlace}})
              .then((result)=>{
                console.log("result.data.placeList : ",result.data.placeList)   
                console.log("result.data.placeList.length : ", result.data.placeList.length)
                  setPlaceList( result.data.placeList );
                  setPlaceListLength(result.data.placeList.length);
                  setPostList("")
                  setPostListLength("")

              }).catch((err)=>{console.error(err)})     
    }, [searchPlace]);



      async function findPostList(placeid){
        console.log("placeid"+placeid)

        await axios.get(`/api/post/findPost`,{params:{placeid}})
        .then((result)=>{
            console.log("result.data.postList : ", result.data.postList)   
            console.log("result.data.postList.length : ", result.data.postList.length)
              setPostList( result.data.postList );
              setPostListLength(result.data.postList.length);
        }

        ).catch((err)=>{console.error(err)}) }

    
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
                (postListLength)?
                (
                    postList.map((post, idx)=>{
                        return (
                            <div key={idx}
                            
                            
                            >
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
            }










    </div>
  )
}

export default GetPlace
