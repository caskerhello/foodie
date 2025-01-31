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
import { FaPeopleGroup } from "react-icons/fa6";

import { useSelector, useDispatch } from 'react-redux';
import { loginAction, logoutAction, setFollowers, setFollowings } from './store/userSlice';
import {Cookies} from 'react-cookie'

import '../style/mainmenu.css'

const MainMenu = (props) => {
    const topMenuOn = {
        position: "fixed",
        left: '27%',
        // transform: 'translateX(-50%)',
        bottom:"0%",
        
        width:"700px",
        border:"1px solid silver",
        borderRadius: "15px",
        
        display: "flex",
        justifyContent: "space-around",
        padding:"10px 0",
        
        marginBottom:"10px",
        boxSizing:"border-box",
        zIndex: "1",
        
        backdropFilter: "blur(5px)",
        borderRadius:"10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "left 1s ease-out",
    }

    const topMenuOff = {
        position: "fixed",
        bottom:"0%",
        left:"5%",
        
        width:"50px",
        border:"1px solid silver",
        borderRadius: "15px",
        
        display: "flex",
        justifyContent: "space-around",
        padding:"10px 0",
        
        marginBottom:"10px",
        boxSizing:"border-box",
        zIndex: "1",
        
        backdropFilter: "blur(5px)",
        borderRadius:"10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "left 1s ease-out",
    }

    const cookies = new Cookies()

    const navigate=useNavigate();
    const [iconstyle, setIconstyle] = useState({width:'30px',height:'30px'});

    const [searchPlace, setSearchPlace] = useState('');
    
    const [topMenuCss, setTopMenuCss] = useState(topMenuOn);
    const [menuViewOrNot, setMenuViewOrNot] = useState(false);
    const [viewOrNot, setViewOrNot] = useState(false);
    const [inputStyle, setInputStyle ] = useState({display:"none"})
    const [imgSrc, setImgSrc]=useState('${process.env.REACT_APP_ADDRESS2}/images/user.png');
    const dispatch = useDispatch();
    const lUser = useSelector( state=>state.user );
    
    useEffect(()=>{
        if(!sessionStorage.getItem('loginAlertShown'))
            {toast.success(
                <>
                <span style={{ color: "rgb(242, 38, 38)" }}>
                {lUser.nickname}
                </span>
                님 로그인 완료!
                </>,
                {
                  position: "top-right",  // 알림 위치 설정
                  autoClose: 1000,         // 자동으로 닫히는 시간 (500ms)
                }
            );}
            sessionStorage.setItem('loginAlertShown', 'true');
    },[])



    useEffect(() => {
        if (viewOrNot) {
            setInputStyle({
                position: 'fixed',
                bottom: '8%',
                right: '23%',
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: "10px",
                width: "700px",
                zIndex: "1",
                opacity: 1, // 나타날 때 완전 불투명
                transition: "opacity 1s ease-in-out",
                 // 부드러운 전환 효과
                pointerEvents: 'auto'
            });
        } else {
            setInputStyle({
                position: 'fixed',
                bottom: '8%',
                right: '23%',
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: "10px",
                width: "700px",
                zIndex: "1",
                opacity: 0, // 나타날 때 완전 불투명
                transition: "opacity 1s ease-in-out", // 부드러운 전환 효과
                pointerEvents: 'none'
            });
            props.setWord('');
            setSearchPlace('');
        }
    }, [viewOrNot]);

    useEffect(()=>{
        if(menuViewOrNot){
            setIconstyle({display:"none"})
            setTopMenuCss(topMenuOff)
        }else{
            setIconstyle({width:'30px',height:'30px'});
            setTopMenuCss(topMenuOn)
            
            props.setWord('');
            setSearchPlace('');
        }
    },[menuViewOrNot])

    function onLogout(){
        toast.success(
            <>
            <span style={{ color: "rgb(242, 38, 38)" }}>
            {lUser.nickname}
            </span>
            님 로그아웃 완료!
            </>,
            {
              position: "top-right",  // 알림 위치 설정
              autoClose: 700,         // 자동으로 닫히는 시간 (500ms)
            }
        );
        setTimeout(() => {
        // axios.get('/api/member/logout')
        // .then((result)=>{
        //     dispatch( logoutAction() );
        //     cookies.remove('user', {path:'/',} )
        //     navigate('/')
        // }).catch((err)=>{console.error(err)})

        dispatch( logoutAction() );
        cookies.remove('user', {path:'/',} )
        navigate('/')

        
            }, 1200);
    }

    function onSearch() {
        if(!searchPlace){return alert("한글자이상 입력해주세요!")}
        props.setWord(searchPlace);  
        console.log(searchPlace);
        navigate(`/getPlaceByName/${searchPlace}`);
        setViewOrNot( !viewOrNot );
    }

    function onCategorySearch(category) {
        
        navigate(`/getPlaceByCategory/${category}`, { replace: true });
        setViewOrNot( !viewOrNot );
    }

    function onChangeMenuView(){
        setMenuViewOrNot( !menuViewOrNot );
        if(viewOrNot)
        {setViewOrNot( !viewOrNot )};
    }

    function onChangeView(){
        setViewOrNot( !viewOrNot );
    }

    const onSubmitEnter = (e) => {
        // if(e.key === 'Enter' || e.keyCode === 13) {
        if(e.key === 'Enter') {
          // 엔터 키 입력 후 발생하는 이벤트 작성
        console.log('enter 입력');
        onSearch()
        setViewOrNot( !viewOrNot );
        }
    }
    
    return (
        <div >
            <div className='mainMenu'style={topMenuCss}>
                <VscMenu className='mainMenuBtns' style={{height:"30px",width:"30px"}} onClick={()=>{ onChangeMenuView() }} />
                
                <VscHome className='mainMenuBtns' style={iconstyle}onClick={ 
                    ()=>{   navigate('/main') }
                }/>

                <VscEdit className='mainMenuBtns' style={iconstyle} onClick={
                    ()=>{ navigate('/writePost')}} />

                <VscSearch className='mainMenuBtns' style={iconstyle} onClick={
                    ()=>{ onChangeView() }} />

                <FaPeopleGroup className='mainMenuBtns' style={iconstyle} onClick={
                    ()=>{ navigate('/meeting') }}/>

                <VscAccount className='mainMenuBtns' style={iconstyle} onClick={
                    ()=>{ navigate('/myPage') }
                } />

                <VscExport className='mainMenuBtns' style={iconstyle} onClick={
                    ()=>{ onLogout(); sessionStorage.setItem('loginAlertShown', '')}}
                />
                
            </div>

            <div className='search' style={inputStyle}>
                <input type="text" value={searchPlace} style={{flex:"4",height:'20px' ,padding:"3px"}} onChange={
                    (e)=>{ setSearchPlace( e.currentTarget.value) } 
                } 
                onKeyDown={onSubmitEnter}
                />
                
                <button style={{flex:"1.2", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>음식점 <br></br>검색</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onCategorySearch(1) }
                }>한식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onCategorySearch(2) }
                }>양식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onCategorySearch(3) }
                }>중식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onCategorySearch(4) }
                }>일식 <br></br>조회</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onCategorySearch(5) }
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
