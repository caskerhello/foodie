import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MainMenu from './MainMenu';
import Post from './post/Post';
import { useSelector } from 'react-redux';
import { CiGps } from "react-icons/ci";
import { VscMap } from "react-icons/vsc";
import { Map, MapMarker ,ZoomControl, CustomOverlayMap  } from "react-kakao-maps-sdk";

const { kakao } = window;


const Main = () => {

const [loginUser, setLoginUser] = useState({});
const [postList, setPostList ] = useState([]);
const [paging, setPaging] = useState({});
const [word, setWord] = useState(null);
const [location, setLocation] = useState({lat:37.57261013516411,lng:126.99042333710086});
const [movedLocation,setMovedLocation] =useState({})

const [findLocation, setFindLocation] = useState({});
const [placeInfo, setPlaceInfo] =useState();

const [center, setCenter] =useState({});
const [lat, setLat] = useState();
const [lng, setLng] = useState();
const [error, setError] = useState();
const [position, setPosition] = useState();
const [isLocationBlocked, setIsLocationBlocked] = useState(false);

const lUser = useSelector( state=>state.user );

const [modalOpen, setModalOpen] = useState(false);
const modalBackground = useRef();
const [profile, setProfile] = useState();

const [viewMapOrNot, setViewMapOrNot] = useState(false);

const navigate = useNavigate();
    
useEffect(() => {
  axios.get(`/api/post/getPostList`, {params:{page:1,word}})
        .then((result)=>{
          console.log("result.data.postList:",result.data.postList)
            setPostList( result.data.postList.content );
            setPaging( result.data.postList.pageable.pageNumber+1 );
        }).catch((err)=>{console.error(err)})
}, []);

useEffect(
  ()=>{
      window.addEventListener('scroll', handleScroll );
      return () => {
          window.removeEventListener("scroll", handleScroll);
      }
  }
)

const handleScroll=()=>{
  const scrollHeight = document.documentElement.scrollHeight - 10; // 스크롤이 가능한 크기
  // 가능 크기를 10px 줄여서 다음페이지 표시 반응 영역을 조금더 넓힙니다
  const scrollTop = document.documentElement.scrollTop;  // 현재 위치
  const clientHeight = document.documentElement.clientHeight; // 내용물의 크기
  if( scrollTop + clientHeight >= scrollHeight ) {
    
      onPageMove( paging + 1 );
  }
}

async function onPageMove( page ){

  const result = await axios.get(`/api/post/getPostList`, {params:{page:page,word}})
  .then((result)=>{
    console.log("result.data.postList.content"+result.data.postList.content)

  setPaging( result.data.postList.pageable.pageNumber+1 );
  let posts = [];
  posts = [...postList];
  posts = [...posts, ...result.data.postList.content ];


  setPostList([...posts]);
  }).catch((err)=>{console.error(err)})
}

function findRestorantLocation(placeid) {

axios.get(`/api/place/getPlaceInfo`, {params:{placeid}})
      .then((result)=>{
        
        setLocation({lat:result.data.place.y, lng:result.data.place.x});
        
        setPlaceInfo(result.data.place.place_url)
        console.log(result.data.place.place_url)

      }).catch((err)=>{console.error(err)})

// setLocation(placeInfo);

}


function onChangeMapView(){
  setViewMapOrNot( !viewMapOrNot );
}

  // 위치 정보를 가져오는 함수
const getLocation = () => {
  setLocation(movedLocation);

  navigator.geolocation.getCurrentPosition(
  (position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setLocation({lat:position.coords.latitude, lng:position.coords.longitude});
  },
  (err) => {
      window.alert("위치 정보 접근을 허용해주세요");
      setLocation({lat:37.57261013516411,lng:126.99042333710086});
  }
  );
};



useEffect(()=>{
      if(!viewMapOrNot){
          setInputMapStyle({ position: 'fixed', top:'7%',right:'1%',width: '600px', height: '500px',borderRadius: '20px',boxShadow: '0 0 10px' });
      }else{
          setInputMapStyle({display:"none"})
          
      }
},[viewMapOrNot])

useEffect(()=>{
  if(!viewMapOrNot){
      setInputMapStyle({ position: 'fixed', top:'15%',right:'1%',width: '600px', height: '500px',borderRadius: '20px',boxShadow: '0 0 10px' });
  }else{
      setInputMapStyle({display:"none"})
      
  }
},[viewMapOrNot])

const [inputMapStyle, setInputMapStyle ] = useState({ position: 'fixed', top:'15%',right:'1%',width: '600px', height: '500px',borderRadius: '20px',boxShadow: '0 0 10px' })

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lan = position.coords.latitude;
        let lon = position.coords.longitude;
        resolve({ lan, lon });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

useEffect(() => {
  // 위치 정보 가져오기
  const fetchLocation = async () => {
    try {
      const { lan, lon } = await getCurrentLocation(); // 위치 정보 받아오기

      setLocation({lat:lan,lng:lon});
      setLat(lan);
      setLng(lon);
      setPosition({lan,lon});
      
    } catch (err) {
      if (!sessionStorage.getItem('alertShown')) {
          alert('위치 정보를 가져오는 데 실패했습니다. 종로3가역 기준으로 탐색을 시작합니다.');
          // 알람을 표시한 후 'alertShown' 값을 sessionStorage에 저장
          sessionStorage.setItem('alertShown', 'true');
        }
      setLocation({lat:37.57261013516411,lng:126.99042333710086});
      setLat(37.57261013516411);
      setLng(126.99042333710086);
    }
  };

  fetchLocation(); // 컴포넌트 로드 시 위치 정보 가져오기

}, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행



function handleMouseOver(){
  
}



function getProfile(memberid){

  axios.get(`/api/member/getProfile`, {params:{memberid}})
      .then((result)=>{
        // console.log(result.data)
        console.log(result.data.profile)
        setProfile(result.data.profile);
        
      }).catch((err)=>{console.error(err)})
}
      
return (
<div
className={`mainContainer ${viewMapOrNot ? 'mapViewActive' : ''}`}
>
  <MainMenu setWord={setWord} />
    <div className='mainPosts'>
      {
        (postList)?(
            postList.map((post, idx)=>{
                return (
                    <Post key={idx} post={post} loginUser={loginUser}
                      setFindLocation={setFindLocation}
                      findLocation={findLocation}
                      findRestorantLocation={findRestorantLocation}
                      setViewMapOrNot={setViewMapOrNot}
                      viewMapOrNot={viewMapOrNot}
                      onChangeMapView={onChangeMapView}
                      setModalOpen={setModalOpen}
                      getProfile={getProfile}
                    />
                )
            })
        ):(null)
      }
    </div>
      
    <div>
      {location ? (
        <div>
          <Map
            center={location}   // 지도의 중심 좌표
            style={inputMapStyle} // 지도 크기
            level={4} // 지도 확대 레벨s
            onDragEnd={(map) => {
                const {lat,lng} = map.getCenter()
                setMovedLocation({lat:lat,lng:lng});
          }}>

            <MapMarker image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
              width: 24,
              height: 35
              }, // 마커이미지의 크기입니다
              }}
              onMouseOver={()=>{handleMouseOver()}}
              position={location}
            >
                {/* <div
                    style={{ backgroundColor: "white", padding: "0.1px" }}
                    // onMouseOver={handleMouseOver}  // 마우스 오버 시 이벤트
                    // onMouseOut={handleMouseOut}    // 마우스 아웃 시 이벤트
                ></div> */}
            </MapMarker>


                {/* <CustomOverlayMap position={location} >
                  <div>
                    {placeInfo?(<button onClick={() => {
                      window.open(`${placeInfo}`, '_blank')}}
                      
                      >
                      상세정보
                    </button>):("현재위치")}
                    
                  </div>
                </CustomOverlayMap> */}
              <ZoomControl position={"RIGHT"} />
          </Map>
        </div>
      ) : (
      <div className='mainMapLoading'>위치 정보를 가져오는 중...</div>
      )}

      <CiGps style={{ position: 'fixed', top:'2%',right:'4%',width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{getLocation()}}/>

      <VscMap style={{ position: 'fixed', top:'2%',right:'1%',width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{onChangeMapView()}}/>

      {
      modalOpen &&
        <div className={'mainModalContainer'} ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
              setModalOpen(false);
          }
          }}>
          <div className={'mainModal'}>
            <div className='mainModalTitle'>
              <button className={'modalCloseBtn'} onClick={() => setModalOpen(false)}>
                X
              </button>
            </div>

            <div className='mainModalContent'>
              { profile?
              (<>
              <div className='profileImg'>
                <img src={`${process.env.REACT_APP_ADDRESS2}/uploads/${profile.profileimg}`} />
              </div>
              <br/>
              <div className='profileMsg'>
                {profile.profilemsg}
              </div>
              </>
              )
              :(<div className='profile'>"Loading..."</div>)
              }
            </div>
          </div>
        </div>
      }
    </div>
</div>
  )
}

export default Main
