import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import jaxios from '../../util/jwtUtil';
import MainMenu from './../MainMenu';

import '../../style/meeting.css'

const MeetingList = () => {
    const loginUser = useSelector( state => state.user ); // 로그인 유저
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [organizer, setOrganizer] = useState('');
    const [maxParticipants, setParticipants] = useState();

    /* MainMenu 사용 변수 */
    const [word, setWord] = useState(null);
    
    return (
        <div className='meeting-container'>
            <MainMenu setWord={setWord} />
            <div className='meeting-list'>
                <button className='creating-button'
                    onClick={ () => { navigate('/createMeeting') }}>
                    모임 생성
                </button>
                <div className='meeting-item'>
                    <div className='title'>제목</div>
                    <div className='location'>장소</div>
                    <div className='day'>날짜</div>
                    <div className='bottom'>
                        <div className='bottom-left'>
                            <div className='organizer'>주최자 : test</div>
                        </div>
                        <div className='bottom-right'>
                            <div className='participants'>1/99</div>
                            <button className='attend-button'>참석</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeetingList
