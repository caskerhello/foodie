import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { VscMenu } from "react-icons/vsc";
import { VscHome } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { VscSearch } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { VscExport } from "react-icons/vsc";

import '../style/mainmenu.css'

const MainMenu = (props) => {
    const topMenuOn = {
        position: "fixed", 
        bottom:"0%",
        right:"34%",
        width:"600px",
        border:"1px solid silver",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "space-around",
        padding:"10px 0",
        marginBottom:"10px",
        boxSizing:"border-box",
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



    const navigate=useNavigate();
    const [loginUser, setLoginUser] = useState({});
    const [iconstyle, setIconstyle] = useState({width:'30px',height:'30px'});

    const [searchTag, setSearchTag] = useState('');
    
    const [topMenuCss, setTopMenuCss] = useState(topMenuOn);
    const [menuViewOrNot, setMenuViewOrNot] = useState(false);
    const [viewOrNot, setViewOrNot] = useState(false);
    const [inputStyle, setInputStyle ] = useState({display:"none"})
    const [imgSrc, setImgSrc]=useState('http://localhost:8070/images/user.png');
   
    

    useEffect(()=>{
        if(viewOrNot){
            setInputStyle({position:'fixed' , bottom:'8%',right:'35%' ,display:"flex",justifyContents:'center',alignItems:'center',border:'1px dotted black' ,marginBottom:"10px"});
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
               
                <VscExport style={iconstyle} onClick={
                    ()=>{ onLogout() }}/>    
                
            </div>

            <div className='search' style={inputStyle}>
                <input type="text" value={searchTag} style={{flex:"5",height:'20px' ,padding:"3px"}} onChange={
                    (e)=>{ setSearchTag( e.currentTarget.value) } 
                } />
                
                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>음식점 검색</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>한식 검색</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>양식 검색</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>중식 검색</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>일식 검색</button>

                <button style={{flex:"1", padding:"3px"}} onClick={
                    ()=>{ onSearch() }
                }>디저트 검색</button>
            </div>
        </div>
    )
}

export default MainMenu
