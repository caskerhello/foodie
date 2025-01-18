import React, {useState, useEffect, useMemo} from 'react'
import { ToastContainer, toast , Bounce, Slide, Flip} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MainMenu from './MainMenu';
import Post from './post/Post';
import { useSelector } from 'react-redux';
import { CiGps } from "react-icons/ci";
import { VscMap } from "react-icons/vsc";
import { Map, MapMarker ,ZoomControl  } from "react-kakao-maps-sdk";
// import useWatchLocation from '@utils/hooks/useCurrentLocation'


const { kakao } = window;


// import '../style/main.css';

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

    
    useEffect(() => {
      

      axios.get(`/api/post/getPostList`, {params:{page:1,word}})
            .then((result)=>{
              // console.log("result.data.postList:",result.data.postList)
              // console.log("result.data.postList.content:",result.data.postList.content)
              // console.log("result.data.postList.pageable.pageNumber:"+result.data.postList.pageable.pageNumber)
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
          // console.log("Number(paging) + 1 :"+ (paging + 1))
            onPageMove( paging + 1 );
        }
    }

      async function onPageMove( page ){
        // console.log("onPageMove( page )"+page)

        

        const result = await axios.get(`/api/post/getPostList`, {params:{page:page,word}})
        .then((result)=>{
        // console.log("result.data.postList.pageable.pageNumber(move):"+result.data.postList.pageable.pageNumber);
        setPaging( result.data.postList.pageable.pageNumber+1 );
        let posts = [];
        posts = [...postList];
        posts = [...posts, ...result.data.postList.content ];

        // console.log("moveposts:"+posts)
        setPostList([...posts]);
        }).catch((err)=>{console.error(err)})     
      }






    function findRestorantLocation(placeid) {
      // console.log(placeid)
      axios.get(`/api/place/getPlaceInfo`, {params:{placeid}})
            .then((result)=>{
              // console.log("result.data.place:",result.data.place)
              // console.log("result.data.place.x:",result.data.place.x)
              // console.log("result.data.place.y:",result.data.place.y)
              setLocation({lat:result.data.place.y, lng:result.data.place.x});
                //setPaging( result.data.paging );
              // console.log("location"+JSON.stringify(location))
            }).catch((err)=>{console.error(err)})

      // console.log("placeInfo"+placeInfo);
      // console.log("placeInfo",placeInfo.x,placeInfo.y)


      setLocation(placeInfo);
      
    }
    

    const navigate = useNavigate();   
    
    function onChangeMapView(){
        setViewMapOrNot( !viewMapOrNot );
    }

    // function setMapCurrent(){
    //     const fetchLocation = async () => {
    //         try {
    //           const { lan, lon } = await getCurrentLocation(); // 위치 정보 받아오기
  
    //           console.log("lan, lon",lan, lon);
  
    //           setLocation({lan,lon});
  
    //           setLat(lan);
    //           setLng(lon);
  
    //           // setLocation({ lat:lan, lng:lon }); // 상태에 위치 정보 저장
              
    //         } catch (err) {
    //           window.alert('위치 정보를 가져오는 데 실패했습니다. 종로3가역 기준으로 탐색을 시작합니다.');
    //           setLocation(37.57261013516411);
    //           setLat(37.57261013516411);
    //           setLng(126.99042333710086);
              
    //           // setError('위치 정보를 가져오는 데 실패했습니다.'); // 오류 처리
    //         }
    //       };
      
    //       fetchLocation();
    // }

        // 위치 정보를 가져오는 함수
    const getLocation = () => {

        setLocation(movedLocation);
        

        navigator.geolocation.getCurrentPosition(
        (position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setLocation({lat:position.coords.latitude, lng:position.coords.longitude});
            // Map.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});  
        },
        (err) => {
            window.alert("위치 정보 접근을 허용해주세요");  
            setLocation({lat:37.57261013516411,lng:126.99042333710086});          
        }
        );
    };    

    // useEffect(() => {
    //     if (location.lat && location.lng) {
    //         // 위치 정보가 업데이트되었을 때만 실행되는 코드
    //         console.log('위치 정보가 갱신되었습니다:', location);
    //     }
    // }, [location]);


    const [viewMapOrNot, setViewMapOrNot] = useState(false);
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

            // console.log("lan, lon",lan, lon);

            setLocation({lat:lan,lng:lon});

            setLat(lan);
            setLng(lon);
            setPosition({lan,lon});

            // setLocation({ lat:lan, lng:lon }); // 상태에 위치 정보 저장
            
          } catch (err) {
            if (!sessionStorage.getItem('alertShown')) {
                alert('위치 정보를 가져오는 데 실패했습니다. 종로3가역 기준으로 탐색을 시작합니다.');
                // 알람을 표시한 후 'alertShown' 값을 sessionStorage에 저장
                sessionStorage.setItem('alertShown', 'true');
              }
            setLocation({lat:37.57261013516411,lng:126.99042333710086});
            setLat(37.57261013516411);
            setLng(126.99042333710086);
            
            // setError('위치 정보를 가져오는 데 실패했습니다.'); // 오류 처리
          }
        };
    
        fetchLocation(); // 컴포넌트 로드 시 위치 정보 가져오기    

      }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행
      
 
  return (
    <div>
          <div className='MainContainer'>
            
            
            <MainMenu setWord={setWord} />

            <div className='MainPosts'>

                <div className='title'>
                    {/* <h1>현재 위치 정보</h1> */}
            
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

      {location ? (
        <div>
            {/* {location} */}         
            
            <Map                
                center={location}   // 지도의 중심 좌표
                style={inputMapStyle} // 지도 크기
                level={4} // 지도 확대 레벨s  
                // onCenterChanged={updateCenterWhenMapMoved}
                onDragEnd={(map) => {
                    const {lat,lng} = map.getCenter()
                    
                    setMovedLocation({lat:lat,lng:lng});
                    // setResult(
                    //   `변경된 지도 중심좌표는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`,
                    // )
                  }}
            >

                <MapMarker image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                
                size: {
                width: 24,
                height: 35
                }, // 마커이미지의 크기입니다
                }}

                position={location}/>

              <ZoomControl position={"RIGHT"} />

            </Map>


            

        </div>
      ) : (
       <div className='MainMapLoading'>위치 정보를 가져오는 중...


      
            
        </div>
      )     } 
        </div> 





                {
                    (postList)?(
                        postList.map((post, idx)=>{
                            return (

                                <Post key={idx} post={post} loginUser={loginUser} setFindLocation={setFindLocation} 
                                findLocation={findLocation}
                                findRestorantLocation={findRestorantLocation}
                                />

                            )
                        })
                    ):(null)
                }
            </div>
            </div>

            <div >
            {/* <Map 
                center={{ lat: 37.5718987, lng: 126.9872482 }}   // 지도의 중심 좌표
                style={{ position: 'fixed', top:'7%',right:'1%',width: '600px', height: '500px',borderRadius: '20px',boxShadow: '0 0 10px' }} // 지도 크기
                level={4}                                   // 지도 확대 레벨s
            >
            </Map> */}                 
        
            <CiGps style={{ position: 'fixed', top:'2%',right:'4%',width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{getLocation()}}/>

            <VscMap style={{ position: 'fixed', top:'2%',right:'1%',width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{onChangeMapView()}}/>
                       
            </div>

            <div>
            {/* <button onClick={notify}>토스트 알림 보기</button>  */}

            {/* <ToastContainer
            position="top-right"
            autoClose={1000}        // 알림이 자동으로 닫히는 시간 (ms)
            hideProgressBar={false} // 진행바 숨기기
            newestOnTop={false}     // 새 알림이 위에 표시될지 여부
            closeOnClick={false}    // 알림 클릭 시 닫히게 할지 여부
            rtl={false}             // 오른쪽에서 왼쪽으로 표시할지 여부 (right-to-left)
            pauseOnFocusLoss       // 페이지에서 포커스를 잃으면 알림 멈추기
            draggable={true}            // 알림을 드래그할 수 있게 할지 여부
            pauseOnHover={true}           // 알림을 호버했을 때 멈추게 할지 여부
            theme="light"          // 알림의 테마 (light/dark)
            transition={Slide}    // 알림 표시 애니메이션 (Bounce, Fade, Flip 등)
            /> */}
              

              
            </div>
            

        </div>
  )
}

export default Main
