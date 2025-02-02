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
    async function deleteMeeting(meetingId){
        const result = window.confirm('해당 모임을 삭제하시겠습니까?')
        if(result){
            const deleteResult = await jaxios.delete('/api/meeting/deleteMeeting', {params: { meetingId }} );
            if(deleteResult.data.msg === 'yes'){
                alert('모임을 성공적으로 삭제했습니다');

                const loadResult = await jaxios.get('/api/meeting/getMeeting');
                setMeetingList(loadResult.data.meetingList);
                setParticipantsList(loadResult.data.participantsList);
            }else {
                alert('모임 삭제에 실패했습니다');
            }
        }
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
