import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import MainMenu from './../MainMenu';

import '../../style/meeting.css'

const MeetingList = () => {
    const [word, setWord] = useState(null);

    return (
        <div className='meeting-container'>
            <MainMenu setWord={setWord} />
            <div className='meeting-list'>
                <button className='creating-button'>모임 생성</button>
                <div className='meeting-item'>
                    <div className='title'>제목</div>
                    <div className='location'>장소</div>
                    <div className='day'>날짜</div>
                    <div className='bottom'>
                        <div className='bottom-left'>
                            <div className='organizer'>주최자</div>
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
