import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import jaxios from '../../util/jwtUtil';

import '../../style/meeting.css'

const Meeting = ({
    meeting,
    onDelete
}) => {
    const loginUser = useSelector(state => state.user); // 로그인 유저

    const [participants, setParticipants] = useState([]);
    const [participantsModalOpen, setParticipantsModalOpen] = useState(false); // 참여자 목록
    const [canJoin, setCanJoin] = useState(true); // 참석 가능 여부
    
    useEffect(() => {
        jaxios.get('/api/meeting/getParticipants', {params: { meetingId: meeting.meetingId }})
        .then((result) => {
            const updatedParticipants = result.data.participants;
            setParticipants(updatedParticipants);

            // 업데이트된 participants를 기반으로 canJoin 상태 설정
            if (updatedParticipants.length >= meeting.maxParticipants) {
                setCanJoin(false);
            } else {
                setCanJoin(true);
            }
        }).catch((err) => { console.error(err); });
}, [meeting]);

    if (!meeting) {
        return null; // meeting이 없으면 아무 것도 렌더링하지 않음
    }

    /* 모임 삭제 */
    async function deleteMeeting(meetingId) {
        const result = window.confirm('해당 모임을 삭제하시겠습니까?');
        if(result){
            try {
                const deleteResult = await jaxios.delete('/api/meeting/deleteMeeting', {params: { meetingId }} );
                if(deleteResult.data.msg === 'yes'){
                    alert('모임을 성공적으로 삭제했습니다');
                    onDelete(meetingId); // 부모 컴포넌트에 삭제된 모임 ID 전달
                }
            } catch(error) {
                console.error('모임 삭제 오류', error);
                alert('모임 삭제에 실패했습니다');
            }
        }
    }

    /* 모임 참여 */
    async function joinMeeting(meetingId) {
        const result = window.confirm('해당 모임에 참여하시겠습니까?');
        if(result){
            try{
                const joinResult = await jaxios.post('/api/meeting/joinMeeting', null, {params: { meetingId, memberId: loginUser.memberid }})
                if(joinResult.data.msg === 'yes'){
                    alert('모임에 참여했습니다');

                    // participants 다시 불러와서 상태 업데이트 (await로 완료될 때까지 기다림)
                    const participantsResult = await jaxios.get('/api/meeting/getParticipants', { params: { meetingId } });
                    const updatedParticipants = participantsResult.data.participants;
                    setParticipants([...updatedParticipants]);

                    // 참가자 수가 최대 인원에 도달했는지 확인 후 setCanJoin 업데이트
                    if (updatedParticipants.length >= meeting.maxParticipants) {
                        setCanJoin(false);
                    }
                }
            } catch(error){
                alert('모임 참여에 실패했습니다');
            }
        }
    }

    /* 모임 참여 취소 */
    async function leaveMeeting(meetingId){
        const result = window.confirm('해당 모임 참여를 취소하시겠습니까?');
        if(result){
            try{
                const leaveResult = await jaxios.delete('/api/meeting/leaveMeeting', {params: { meetingId, memberId: loginUser.memberid }})
                if(leaveResult.data.msg === 'yes'){
                    alert('모임 참여를 취소했습니다');

                    // participants 다시 불러와서 상태 업데이트
                    const participantsResult = await jaxios.get('/api/meeting/getParticipants', {params: { meetingId }});
                    setParticipants([...participantsResult.data.participants]);
                }
            } catch(error){
                alert('모임 참여에 실패했습니다');
            }
        }
    }

    return (
        <div className='meeting-item'>
            {
                meeting && participants ? (
                    <>
                        <div className='title'>{meeting.title}</div>
                        <div className='location'>{meeting.location}</div>
                        <div className='day'>{new Date(meeting.datetime).toLocaleString()}</div>
                        <div className='bottom'>
                            <div className='bottom-left'>
                                <div className='organizer'>주최자 : {meeting.member.nickname}</div>
                            </div>
                            <div className='bottom-right'>
                                <div className='participants'
                                    onClick={ () => setParticipantsModalOpen(!participantsModalOpen) }>
                                    {participants.length} / {meeting.maxParticipants}
                                        {
                                            participantsModalOpen && participants.length > 0 && (
                                                <div className='participants-view'>
                                                    {
                                                        participants.map((participant, idx) => {
                                                            return (
                                                                <div key={idx}>{participant.member.nickname}</div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                </div>
                                {
                                    (meeting.organizer === loginUser.memberid) ? (
                                        <button className='attend-button'
                                            onClick={ ()=>{ deleteMeeting(meeting.meetingId) } }>
                                            삭제
                                        </button>
                                    ) : (
                                            participants.some(
                                                (participant) => (participant.member.memberid === loginUser.memberid)) ? (
                                                    <button
                                                        onClick={ ()=>{ leaveMeeting(meeting.meetingId) } }>
                                                        미참석
                                                    </button>
                                                ) : (
                                                    <button
                                                        disabled={ !canJoin }
                                                        className={ (!canJoin) ? "disabled" : "enabled" }
                                                        onClick={ ()=>{ joinMeeting(meeting.meetingId) } }>
                                                        참석
                                                    </button>
                                                )
                                        )
                                }
                            </div>
                        </div>
                    </>
                ) : (null)
            }
        </div>
    );
}

export default Meeting;