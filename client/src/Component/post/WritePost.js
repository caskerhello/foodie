import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainMenu from '../MainMenu';

import '../../style/writepost.css'

const WritePost = () => {
    const navigate=useNavigate();
    const [content, setContent] = useState('');
    const [word, setWord] = useState('')
    const [loginUser, setLoginUser ] = useState({});

    const [ imgsrc1, setImgsrc1 ] = useState('');
    const [ imgsrc2, setImgsrc2 ] = useState('');
    const [ imgsrc3, setImgsrc3 ] = useState('');
    const [ imgsrc4, setImgsrc4 ] = useState('');
    const [ imgsrc5, setImgsrc5 ] = useState('');
    const [ imgsrc6, setImgsrc6 ] = useState('');
    const [ imgsrc7, setImgsrc7 ] = useState('');
    const [ imgsrc8, setImgsrc8 ] = useState('');
    const [ imgsrc9, setImgsrc9 ] = useState('');
    const [ imgsrc10, setImgsrc10 ] = useState('');

    const [ divStyle2, setDivStyle2 ] = useState({display:'none'});
    const [ divStyle3, setDivStyle3 ] = useState({display:'none'});
    const [ divStyle4, setDivStyle4 ] = useState({display:'none'});
    const [ divStyle5, setDivStyle5 ] = useState({display:'none'});
    const [ divStyle6, setDivStyle6 ] = useState({display:'none'});
    const [ divStyle7, setDivStyle7 ] = useState({display:'none'});
    const [ divStyle8, setDivStyle8 ] = useState({display:'none'});
    const [ divStyle9, setDivStyle9 ] = useState({display:'none'});
    const [ divStyle10, setDivStyle10 ] = useState({display:'none'});

    const [imgList, setIimgList] = useState([]);

    const fieldStyle={
        width:"100%", 
        display: "flex",
        flexDirection:"row",
        margin:"5px 0",
        justifyContent: "space-between",
        border:"1px solid black",
    }

    useEffect(
        ()=>{
            // axios.get('/api/member/getLoginUser')
            // .then((result)=>{
            //     if(!result.data.loginUser){
            //         alert('로그인이 필요합니다');
            //         navigate('/');
            //     }
            //     setLoginUser( result.data.loginUser );
            // })
            // .catch((err)=>{console.error(err)})
        },[]
    )

    async function imgUpload(e, n){
        

    }

    async function onSubmit(){
        
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            
            <MainMenu setWord={setWord}/>

            <div className='postWrite'>
                <div className='title' style={{fontSize:"150%"}}>포스팅</div>
                <div className='field'>
                    <label>content</label>
                    <textarea rows="7" value={content} onChange={
                        (e)=>{ setContent( e.currentTarget.value ) }
                    }></textarea>
                </div>

                <div className='field' id='img1'>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 1) }} />
                </div>
                <img src={imgsrc1} height="50"/>

                <div className='field' id='img2' style={divStyle2}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 2) }} />
                </div>
                <img src={imgsrc2} height="50"/>

                <div className='field' id='img3' style={divStyle3}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 3) }} />
                </div>
                <img src={imgsrc3} height="50"/>

                <div className='field' id='img4' style={divStyle4}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 4) }} />
                </div>
                <img src={imgsrc4} height="50"/>

                <div className='field' id='img5' style={divStyle5}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 5) }} />
                </div>
                <img src={imgsrc5} height="50"/>

                <div className='field' id='img6' style={divStyle6}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 6) }} />
                </div>
                <img src={imgsrc6} height="50"/>

                <div className='field' id='img7' style={divStyle7}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 7) }} />
                </div>
                <img src={imgsrc7} height="50"/>

                <div className='field' id='img8' style={divStyle8}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 8) }} />
                </div>
                <img src={imgsrc8} height="50"/>

                <div className='field' id='img9' style={divStyle9}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 9) }} />
                </div>
                <img src={imgsrc9} height="50"/>

                <div className='field' id='img10' style={divStyle10}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 10) }} />
                </div>
                <img src={imgsrc10} height="50"/>

                <div className='btns'>
                    <button onClick={ ()=>{ onSubmit() } }>작성완료</button>
                    <button onClick={ ()=>{ navigate('/main') } }>Main으로</button>
                </div>

            </div>
        </div>
    )
}

export default WritePost
