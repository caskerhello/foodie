import React, {useState, useEffect, useMemo} from 'react'
import { ToastContainer, toast , Bounce, Slide, Flip} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MainMenu from './MainMenu';
import Post from './post/Post';
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
    
    const [center, setCenter] =useState({});
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [error, setError] = useState();
    const [position, setPosition] = useState();
    const [isLocationBlocked, setIsLocationBlocked] = useState(false);

    
    useEffect(() => {
      if(!sessionStorage.getItem('loginAlertShown'))
      toast.success("로그인 완료!", {
        position: "top-center",  // 알림 위치 설정
        autoClose: 3000,         // 자동으로 닫히는 시간 (3초)
      });
      sessionStorage.setItem('loginAlertShown', 'true');

      axios.get(`/api/post/getPostList`, {params:{word}})
            .then((result)=>{
              console.log("result.data.postList:",result.data.postList)
                setPostList( result.data.postList );
                //setPaging( result.data.paging );
            }).catch((err)=>{console.error(err)})



        
    }, []);

    
    

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
            setInputMapStyle({ position: 'fixed', top:'7%',right:'1%',width: '600px', height: '500px',borderRadius: '20px',boxShadow: '0 0 10px' });
        }else{
            setInputMapStyle({display:"none"})
            
        }
        },[viewMapOrNot])

    const [inputMapStyle, setInputMapStyle ] = useState({ position: 'fixed', top:'7%',right:'1%',width: '600px', height: '500px',borderRadius: '20px',boxShadow: '0 0 10px' })

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

            console.log("lan, lon",lan, lon);

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

            <div className='Posts' style={{border:"1px solid black", height:"600px", width:"600px"}}>

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
       <div>위치 정보를 가져오는 중...
            
        </div>
      )     } 
                </div>              
                {
                    (postList)?(
                        postList.map((post, idx)=>{
                            return (

                                <Post key={idx} post={post} loginUser={loginUser}/>

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

            <ToastContainer
        position="top-right"
        autoClose={5000}        // 알림이 자동으로 닫히는 시간 (ms)
        hideProgressBar={false} // 진행바 숨기기
        newestOnTop={false}     // 새 알림이 위에 표시될지 여부
        closeOnClick={false}    // 알림 클릭 시 닫히게 할지 여부
        rtl={false}             // 오른쪽에서 왼쪽으로 표시할지 여부 (right-to-left)
        pauseOnFocusLoss       // 페이지에서 포커스를 잃으면 알림 멈추기
        draggable={true}            // 알림을 드래그할 수 있게 할지 여부
        pauseOnHover={true}           // 알림을 호버했을 때 멈추게 할지 여부
        theme="light"          // 알림의 테마 (light/dark)
        transition={Slide}    // 알림 표시 애니메이션 (Bounce, Fade, Flip 등)
      />
              

              
            </div>
            

        </div>
  )
}

export default Main
