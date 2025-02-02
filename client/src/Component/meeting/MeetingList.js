import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import jaxios from '../../util/jwtUtil';
import MainMenu from './../MainMenu';
import Meeting from './Meeting';

import '../../style/meeting.css'

const MeetingList = () => {
    const loginUser = useSelector( state => state.user ); // 로그인 유저
    const navigate = useNavigate();

    const [meetingList, setMeetingList] = useState([]);

    /* MainMenu 사용 변수 */
    const [word, setWord] = useState(null);
    
    /* 모임 리스트 불러오기 */
    useEffect (
        () => {
            jaxios.get('/api/meeting/getMeeting')
            .then((result) => {
                setMeetingList(result.data.meetingList);
                console.log('meetingList', meetingList);
            }).catch((err) => { console.error('모임 불러오기 실패', err); })
        }, []
    )

    /* 모임 삭제 함수 */
    const handleDeleteMeeting = (meetingId) => {
        setMeetingList((prevList) => prevList.filter(meeting => meeting.meetingId !== meetingId));
    };

    return (
        <div className='meeting-container'>
            <MainMenu setWord={setWord} />
            <div className='meeting-list'>
                <button className='creating-button'
                    onClick={ () => { navigate('/createMeeting') }}>
                    모임 생성
                </button>
                {
                    (meetingList) ? (
                        meetingList.map((meeting, idx) => {
                            return (
                                <Meeting
                                    key={meeting.meetingId} // 고유한 key 추가
                                    meeting={meeting}
                                    onDelete={handleDeleteMeeting}
                                />
                            );
                        })
                    ) : (
                        <div className='meeting-list'>
                            <div className='title'>생성된 모임이 없습니다</div>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default MeetingList;
