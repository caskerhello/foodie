import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast , Bounce, Slide, Flip} from 'react-toastify';

import { VscMenu } from "react-icons/vsc";
import { VscHome } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { VscSearch } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { VscExport } from "react-icons/vsc";

import { useSelector, useDispatch } from 'react-redux';
import { loginAction, logoutAction, setFollowers, setFollowings } from './store/userSlice';
import {Cookies} from 'react-cookie'

import '../style/mainmenu.css'

const MainMenu = (props) => {
    const topMenuOn = {
        position: "fixed", 
        bottom:"0%",
        right:"34%",
        width:"700px",
        border:"1px solid silver",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "space-around",
        padding:"10px 0",
        marginBottom:"10px",
        boxSizing:"border-box",
        zIndex: "1"
    }

    const topMenuOff = {
        position: "fixed", 
        bottom:"0%",
        left:"10%",
        width:"50px",
        border:"1px solid silver",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "space-around",
        padding:"10px 0",
        marginBottom:"10px",
        boxSizing:"border-box",
    }

    const cookies = new Cookies()

    const navigate=useNavigate();
    const [loginUser, setLoginUser] = useState({});
    const [iconstyle, setIconstyle] = useState({width:'30px',height:'30px'});

    const [searchTag, setSearchTag] = useState('');
    
    const [topMenuCss, setTopMenuCss] = useState(topMenuOn);
    const [menuViewOrNot, setMenuViewOrNot] = useState(false);
    const [viewOrNot, setViewOrNot] = useState(false);
    const [inputStyle, setInputStyle ] = useState({display:"none"})
    const [imgSrc, setImgSrc]=useState('http://localhost:8070/images/user.png');
    const dispatch = useDispatch();
    const lUser = useSelector( state=>state.user );
    
    useEffect(()=>{
        if(!sessionStorage.getItem('loginAlertShown'))
            {toast.success(`${lUser.nickname}님 로그인 완료!`, {
              position: "top-right",  // 알림 위치 설정
              autoClose: 500,         // 자동으로 닫히는 시간 (2초)
            });}
            sessionStorage.setItem('loginAlertShown', 'true');
    },[])



    useEffect(()=>{
        if(viewOrNot){
            setInputStyle({position:'fixed' , bottom:'8%',right:'35%' ,display:"flex",justifyContents:'center',alignItems:'center',border:'1px dotted black' ,marginBottom:"10px",width:"700px",zIndex: "1"});
        }else{
            setInputStyle({display:"none"})
            props.setWord('');
            setSearchTag('');
        }
    },[viewOrNot])

    useEffect(()=>{
        if(menuViewOrNot){
            setIconstyle({display:"none"})
            setTopMenuCss(topMenuOff)
        }else{
            setIconstyle({width:'30px',height:'30px'});
            setTopMenuCss(topMenuOn)
            
            props.setWord('');
            setSearchTag('');
        }
    },[menuViewOrNot])

    function onLogout(){
        {toast.success(`${lUser.nickname}님 로그아웃 완료!`, {
            position: "top-right",  // 알림 위치 설정
            autoClose: 500,         // 자동으로 닫히는 시간 (2초)
          });}
        setTimeout(() => {
        axios.get('/api/member/logout')
        .then((result)=>{
            dispatch( logoutAction() );
            cookies.remove('user', {path:'/',} )
            navigate('/')
        }).catch((err)=>{console.error(err)})
        // window.alert("로그아웃 되었습니다.")

        
            }, 800); 
    }

    function onSearch(){
        props.setWord( searchTag );
    }

    function onChangeMenuView(){
        setMenuViewOrNot( !menuViewOrNot );
    }

    function onChangeView(){
        setViewOrNot( !viewOrNot );
    }
    
    return (
        <div >
            <div className='topmenu'style={topMenuCss}>
                <VscMenu style={{height:"30px",width:"30px"}} onClick={()=>{ onChangeMenuView() }} />
                
                <VscHome style={iconstyle}onClick={ 
                    ()=>{   navigate('/main') }
                }/>                

                <VscEdit style={iconstyle} onClick={
                    ()=>{ navigate('/writePost')}} />
               
                <VscSearch style={iconstyle} onClick={
                    ()=>{ onChangeView()  }} />
              
                <VscAccount style={iconstyle} onClick={
                    ()=>{ navigate('/myPage') }
                } />
               
                {/* <VscExport style={iconstyle} onClick={
                    ()=>{ onLogout() }}/>     */}

                <VscExport style={iconstyle} onClick={
                    ()=>{ onLogout(); sessionStorage.setItem('loginAlertShown', '')}}

                    // ()=>{ 
                    //     navigate('/') ; 
                    //     sessionStorage.setItem('loginAlertShown', '');

                    // }}
                    />  
                
            </div>

            <div className='search' style={inputStyle}>
                <input type="text" value={searchTag} style={{flex:"4",height:'20px' ,padding:"3px"}} onChange={
                    (e)=>{ setSearchTag( e.currentTarget.value) } 
                } />
                
                <button style={{flex:"1.2", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>음식점 <br></br>검색</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>한식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>양식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>중식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>일식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>후식 <br></br>조회</button>
            </div>


            <ToastContainer
            position="top-right"
            autoClose={1000}        // 알림이 자동으로 닫히는 시간 (ms)
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

        
    )
}

export default MainMenu
