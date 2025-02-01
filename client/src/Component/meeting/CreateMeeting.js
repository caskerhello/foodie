import React, { useState, useEffect, useSelector, useRef } from 'react'
import { useNavigate } from "react-router-dom";

import jaxios from '../../util/jwtUtil';
import MapContainer from '../post/MapContainer';
import DateRangePicker from '../util/DateRangePicker'; // 날짜 선택 api

const { kakao } = window; // 카카오맵

const CreateMeeting = () => {
    const loginUser = useSelector( state => state.user ); // 로그인 유저

    /* 카카오맵 장소 불러오기를 위한 변수 */
    const modalBackground = useRef();
    const [movedLocation2,setMovedLocation2] =useState({})
    const [InputText, setInputText] = useState('')
    const [place, setPlace] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [place_name,setPlace_name] = useState();
    const [road_address_name,setRoad_address_name] = useState();
    const [phone,setPhone] = useState();
    const [place_url,setPlace_url] = useState();
    const [selectedPlace,setSelectedPlace] = useState();
    const [currentLocation, setCurrentLocation] = useState({})
    const [options1, setOptions1] = useState({
        location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
        radius: 1000,
        sort: kakao.maps.services.SortBy.DISTANCE,
    });

    /* 카카오맵 장소 검색 */
    async function selectButton(place){
        if(!((place.category_group_code == 'FD6')||(place.category_group_code == 'CE7'))){
            return alert("음식점만 선택해주세요");
        }
        console.log("place.id" + place.id);
    
        let placeresult = await jaxios.post('/api/place/checkPlaceCategory', null ,{params: {kakaoplaceid:place.id}  } )
        //setBeforeSetCategory(placeresult.data.category);
        //setCategory(placeresult.data.category);
        setSelectedPlace(place);
    }

    /* 장소 값 변경 */
    const onChange = (e) => {
        setInputText(e.target.value)
    }

    /* 카카오맵에서 검색한 장소 정보 */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(movedLocation2.lat){
            setOptions1({
                location: new kakao.maps.LatLng(
                    movedLocation2.lat,
                    movedLocation2.lng
                ),
                radius: 1000,
                sort: kakao.maps.services.SortBy.DISTANCE
            })
        }else if ( currentLocation.latitude && currentLocation.longitude) {
            setOptions1({
                location: new kakao.maps.LatLng(currentLocation.latitude,currentLocation.longitude),
                radius: 1000,
                sort: kakao.maps.services.SortBy.DISTANCE
            })
        }else{
            setOptions1({
                location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
                radius: 1000,
                sort: kakao.maps.services.SortBy.DISTANCE
            })
        }
        setPlace(InputText);
        setInputText('');
    }

    return (
        <div className='meeting-container'>
            <div className='logo'>모임 생성</div>
            <div className='meeting-write'>
                <div className='field'>
                    <label>제목</label>
                    <input type='text' placeholder='모임 제목을 입력하세요'></input>
                </div>
                <div className='field'>
                    <label>장소</label>
                    <div className='place'>
                        {selectedPlace? (
                            <div>
                                장소 이름: {selectedPlace.place_name}<br/>
                                도로명 주소: {selectedPlace.road_address_name}<br/>
                                <button onClick={() => setModalOpen(true)}>재검색</button>
                            </div>
                        ) : (
                            <p>장소를 검색해주세요<br/>
                                <button onClick={() => setModalOpen(true)}>검색</button>
                            </p>
                        )}
                    </div>
                    {
                        modalOpen &&
                        <div className={'writePostModalContainer'}
                            ref={modalBackground}
                            onClick={ e => {
                                if (e.target === modalBackground.current) {
                                    setModalOpen(false);
                                    setPlace('');
                                }
                            }}>
                        <div className={'writePostModalContent'}>
                            <div className='writePostTitle'>
                                <button className={'modalCloseBtn'}
                                    onClick={() => { setModalOpen(false); setPlace(''); } }>
                                X
                                </button>
                            </div>
                                
                            <form className="inputForm" onSubmit={handleSubmit}>
                                <input placeholder="장소 검색" onChange={onChange} value={InputText} autoFocus/>
                                <button type="submit" className='modalCloseBtn'>검색</button>
                                <br/>
                                <br/>
                            </form>
                            {/* 장소 검색을 위한 카카오맵 api */}
                            <MapContainer
                                searchPlace={place}
                                setPlace={setPlace}
                                setPlace_name={setPlace_name}
                                setRoad_address_name={setRoad_address_name}
                                setPhone={setPhone}
                                setPlace_url={setPlace_url}
                                setModalOpen={setModalOpen}
                                setSelectedPlace={setSelectedPlace}
                                movedLocation2={movedLocation2}
                                setMovedLocation2={setMovedLocation2}
                                options1={options1}
                                setOptions1={setOptions1}
                                selectButton={selectButton}
                                setCurrentLocation={setCurrentLocation}
                            />
                            </div>
                        </div>
                    }
                </div>
                <div className='field'>
                    <label>날짜</label>
                    <input type='text' placeholder='모임 제목을 입력하세요'></input>
                    {/* 날짜 선택 달력 api */}
                    {/* <DateRangePicker /> */}
                </div>
                <div className='field'>
                    <label>주최자</label>
                    <input type='text' value={loginUser.nickname}></input>
                </div>
                <div className='field'>
                    <label>최대인원</label>
                    <input type='text' maxLength={99}>명</input>
                </div>
            </div>
        </div>
    )
}

export default CreateMeeting;
