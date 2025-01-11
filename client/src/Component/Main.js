import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MainMenu from './MainMenu';
import Post from './post/Post';
import { CiGps } from "react-icons/ci";
import { VscMap } from "react-icons/vsc";
import { Map, MapMarker  } from "react-kakao-maps-sdk";
// import useWatchLocation from '@utils/hooks/useCurrentLocation'


// import '../style/main.css';

const Main = () => {
    const [loginUser, setLoginUser] = useState({});
    const [postList, setPostList ] = useState([]);
    const [paging, setPaging] = useState({});
    const [word, setWord] = useState(null);
    const [location, setLocation] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [error, setError] = useState();
    const [position, setPosition] = useState();
    const [isLocationBlocked, setIsLocationBlocked] = useState(false);
    

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
        navigator.geolocation.getCurrentPosition(
        (position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setError(null);            
        },
        (err) => {
            window.alert("위치 정보 접근을 허용해주세요");            
        }
        );
    };    

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
            window.alert('위치 정보를 가져오는 데 실패했습니다. 종로3가역 기준으로 탐색을 시작합니다.');
            setLocation({lat:37.57261013516411,lng:126.99042333710086});
            setLat(37.57261013516411);
            setLng(126.99042333710086);
            
            // setError('위치 정보를 가져오는 데 실패했습니다.'); // 오류 처리
          }
        };
    
        fetchLocation(); // 컴포넌트 로드 시 위치 정보 가져오기    

      }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행
      
 
  return (
    <div style={{display:"flex", flexDirection:"row", alignItems:"center",marginTop: "50px"}}>
          <div style={{border:"1px solid black", height:"600px", width:"800px"}}>
            
            
            <MainMenu setWord={setWord} />

            <div className='Posts' style={{border:"1px solid black", height:"600px", width:"600px"}}>

                <div className='title'>
                    {/* <h1>현재 위치 정보</h1> */}
            
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

      {location ? (
        <p>
            {/* {location} */}         
            
            <Map
                center={location}   // 지도의 중심 좌표
                style={inputMapStyle} // 지도 크기
                level={4} // 지도 확대 레벨s                       
            >

                <MapMarker image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                
                size: {
                width: 24,
                height: 35
                }, // 마커이미지의 크기입니다
                }}

                position={location}/>

            </Map>


            

        </p>
      ) : (
        <p>위치 정보를 가져오는 중...
            
        </p>
      )     } 
                </div>

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

            <div >
            {/* <Map 
                center={{ lat: 37.5718987, lng: 126.9872482 }}   // 지도의 중심 좌표
                style={{ position: 'fixed', top:'7%',right:'1%',width: '600px', height: '500px',borderRadius: '20px',boxShadow: '0 0 10px' }} // 지도 크기
                level={4}                                   // 지도 확대 레벨s
            >
            </Map> */}     

            


        {/* if(!{location})
      

            <Map                
                center={{lat:33.5,lng:127}}   // 지도의 중심 좌표
                style={inputMapStyle} // 지도 크기
                level={4} // 지도 확대 레벨s                       
            >
            </Map>
        
        else{
            
            <Map                
            center={{lat:33.5,lng:127}}   // 지도의 중심 좌표
            style={inputMapStyle} // 지도 크기
            level={4} // 지도 확대 레벨s                       
            >
            </Map>

        } */}

            <CiGps style={{ position: 'fixed', top:'2%',right:'4%',width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{getLocation()}}/>

            <VscMap style={{ position: 'fixed', top:'2%',right:'1%',width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{onChangeMapView()}}/>
                       
            </div>

            

        </div>
  )
}

export default Main
