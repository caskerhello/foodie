import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import jaxios from '../../util/jwtUtil';
import MapContainer from '../post/MapContainer';
import CustomDatePicker from '../util/CustomDatePicker'; // 날짜 선택 api

import '../../style/createmeeting.css'

const { kakao } = window; // 카카오맵

const CreateMeeting = () => {
    const loginUser = useSelector( state => state.user ); // 로그인 유저
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [organizer, setOrganizer] = useState(loginUser.memberid);
    const [maxParticipants, setMaxParticipants] = useState(null);
    const [status, setStatus] = useState('Y');
    const [isMeetingWriteValid, setIsMeetingWriteValid] = useState(false);

    /* 카카오맵 장소 불러오기를 위한 변수 */
    const modalBackground = useRef();
    const [movedLocation2,setMovedLocation2] =useState({})
    const [InputText, setInputText] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [place, setPlace] = useState('');
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

    /* 날짜 선택 달력 api 변수 */
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    /* 카카오맵 장소 검색 */
    async function selectButton(place){
        if(!((place.category_group_code == 'FD6')||(place.category_group_code == 'CE7'))){
            return alert("음식점만 선택해주세요");
        }
        setSelectedPlace(place);
        setLocation(place.road_address_name);
    }

    /* 장소 검색어 */
    const handleInputChange = (e) => {
        setInputText(e.target.value); // 사용자 입력을 상태에 저장
    };

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
        }else if (currentLocation.latitude && currentLocation.longitude) {
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

    /* 모든 항목에 값이 있는지 확인 */
    useEffect(() => {
        const isValidDate = selectedDateTime instanceof Date && !isNaN(selectedDateTime.getTime());
    
        if (title && location && isValidDate && organizer && maxParticipants) {
            setIsMeetingWriteValid(true);
        } else {
            setIsMeetingWriteValid(false);
        }
    }, [title, place, selectedDateTime, organizer, maxParticipants]);

    /* 모임 생성 */
    function createMeeting(){
        const formattedDate = selectedDateTime.toISOString();  // Date 객체를 ISO 8601 문자열로 변환

        jaxios.post('/api/meeting/createMeeting',
            { title, location, datetime: formattedDate, organizer, maxParticipants, status },
            { params: { memberId: loginUser.memberid }})
        .then((result) => {
            if(result.data.msg === 'yes'){
                alert('모임이 생성되었습니다.');
                navigate('/meetingList');
            }else{
                alert('모임 생성에 실패했습니다');
            }
        }).catch((err) => { console.error(err); })
    }

    return (
        <div className='meeting-container'>
            <div className='meeting-write'>
                <div className='logo'>모임 생성</div>
                <div className='field'>
                    <label>제목</label>
                    <input type='text'
                        placeholder='모임 제목을 입력하세요'
                        value={title}
                        onChange={ (e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className='field'>
                    <label>장소</label>
                    <div className='place'>
                        {
                            selectedPlace ? (
                                <div>
                                    장소 이름: {selectedPlace.place_name}<br/>
                                    도로명 주소: {selectedPlace.road_address_name}<br/>
                                    <button onClick={() => setModalOpen(true)}>재검색</button>
                                </div>
                            ) : (
                                <p>장소를 검색해주세요<br/><br/>
                                    <button onClick={() => setModalOpen(true)}>검색</button>
                                </p>
                            )
                        }
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
                                    <input placeholder="장소 검색"
                                        onChange={handleInputChange}
                                        value={InputText}
                                        autoFocus
                                    />
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
                    <label>모임 날짜와 시간</label>
                    <input type='text'
                        value={selectedDateTime.toLocaleString()}
                        onClick={() => {
                            calendarModalOpen ? (
                                setCalendarModalOpen(false)
                            ) : (setCalendarModalOpen(true)) }}
                        readOnly
                    />
                </div>
                {
                    calendarModalOpen &&
                    <div className='calendar-modal'>
                        {/* 날짜 선택 달력 api */}
                        <CustomDatePicker
                            startDate={startDate}
                            setStartDate={setStartDate}
                            setSelectedDateTime={setSelectedDateTime}
                            calendarModalOpen={calendarModalOpen}
                        />
                    </div>
                }
                <div className='field'>
                    <label>주최자</label>
                    <input type='text' value={loginUser.nickname}/>
                </div>
                <div className='field'>
                    <label>최대인원</label>
                    <input type='text'
                        placeholder='최대 99명'
                        value={maxParticipants}
                        onChange={ (e) => {
                            const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
                            const numValue = Number(value);
                    
                            if (numValue >= 1 && numValue <= 99) {
                                setMaxParticipants(value);
                            } else if (value === "") {
                                setMaxParticipants(""); // 빈 값 허용
                            }
                        } }
                        maxLength={2}/>
                </div>
                <div className='create-buttons'>
                    <button onClick={ createMeeting }
                        disabled={!isMeetingWriteValid}
                        className={(!isMeetingWriteValid) ? "disabled" : "enabled"}>
                        생성
                    </button>
                    <button onClick={ () => { navigate('/meetingList') } }>취소</button>
                </div>
            </div>
        </div>
    )
}

export default CreateMeeting;
