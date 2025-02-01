import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import jaxios from '../../util/jwtUtil';
import MainMenu from './../MainMenu';

import '../../style/meeting.css'

const MeetingList = () => {
    const loginUser = useSelector( state => state.user ); // 로그인 유저
    const navigate = useNavigate();

    const [meetingList, setMeetingList] = useState([]);
    const [participantsList, setParticipantsList] = useState([]);

    /* MainMenu 사용 변수 */
    const [word, setWord] = useState(null);
    
    /* 모임 리스트 불러오기 */
    useEffect(
        () => {
            jaxios.get('/api/meeting/getMeeting')
            .then((result) => {
                setMeetingList(result.data.meetingList);
                setParticipantsList(result.data.participantsList);
            }).catch((err) => { console.error('모임 불러오기 실패', err) })
        }, []
    )

    /* 모임 삭제 */
    function deleteMeeting(meetingId){

    }

    return (
        <div className='meeting-container'>
            <MainMenu setWord={setWord} />
            <div className='meeting-list'>
                <button className='creating-button'
                    onClick={ () => { navigate('/createMeeting') }}>
                    모임 생성
                </button>
                {
                    (meetingList && participantsList) ? (
                        meetingList.map((meeting, idx) => {
                            return (
                                <div className='meeting-item' key={idx}>
                                    <div className='title'>{meeting.title}</div>
                                    <div className='location'>{meeting.location}</div>
                                    <div className='day'>{new Date(meeting.datetime).toLocaleString()}</div>
                                    <div className='bottom'>
                                        <div className='bottom-left'>
                                            <div className='organizer'>주최자 : {meeting.member.nickname}</div>
                                        </div>
                                        <div className='bottom-right'>
                                            <div className='participants'>
                                                {/* {
                                                (participantsList)
                                            } */}
                                            1/{meeting.maxParticipants}</div>
                                            {
                                                (meeting.organizer === loginUser.memberid) ? (
                                                    <button onClick={ ()=>{ deleteMeeting(meeting.meetingId) } }>삭제</button>
                                                ) : (
                                                    <button className='attend-button'>참석</button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (null)
                }
                
            </div>
        </div>
    )
}

export default MeetingList;
