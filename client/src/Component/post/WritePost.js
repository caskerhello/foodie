import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainMenu from '../MainMenu';
import MapContainer from '../post/MapContainer';

import '../../style/mapcontainer.css'
import '../../style/writepost.css'

const { kakao } = window

const WritePost = () => {
    const navigate=useNavigate();
    const [content, setContent] = useState('');
    const [word, setWord] = useState('')
    const [loginUser, setLoginUser ] = useState({});
    



    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    const [place_name,setPlace_name] = useState();
    const [road_address_name,setRoad_address_name] = useState();
    const [phone,setPhone] = useState();
    const [place_url,setPlace_url] = useState();
    const [selectedPlace,setSelectedPlace] = useState({});

    const [options1, setOptions1] = useState(
        {
        location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
        radius: 1000,
        sort: kakao.maps.services.SortBy.DISTANCE,
      });

    const [movedLocation2,setMovedLocation2] =useState({})

    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')
  
    const onChange = (e) => {
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()



      setOptions1({
        location: new kakao.maps.LatLng(movedLocation2.lat,movedLocation2.lng),
        radius: 1000,
        sort: kakao.maps.services.SortBy.DISTANCE,
      })

    //   console.log(options1)

      setPlace(InputText)
      setInputText('')
    }

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

    const divStyle1={
        width:"20%", 
        display: "flex",
        flexDirection:"row",
        margin:"5px 0",
        justifyContent: "space-between",
        border:"0px solid black",
    }

    const fieldStyle={
        width:"20%", 
        display: "flex",
        flexDirection:"row",
        margin:"5px 0",
        justifyContent: "space-between",
        border:"0px solid black",
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
        // let formData = new FormData();
        // formData.append('image', e.target.files[0] );
        // const result = await axios.post('/api/post/imgup', formData);

        if( n == 1){
            setDivStyle2( fieldStyle );
            // setImgsrc1( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 2){
            setDivStyle3( fieldStyle );
            // setImgsrc2( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 3){
            setDivStyle4( fieldStyle );
            // setImgsrc3( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 4){
            setDivStyle5( fieldStyle );
            // setImgsrc4( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 5){
            setDivStyle6( fieldStyle );
            // setImgsrc5( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 6){
            setDivStyle7( fieldStyle );
            // setImgsrc6( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 7){
            setDivStyle8( fieldStyle );
            // setImgsrc7( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 8){
            setDivStyle9( fieldStyle );
            // setImgsrc8( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 9){
            setDivStyle10( fieldStyle );
            // setImgsrc9( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 10){
            // setImgsrc2( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }

        // let arr = [...imgList];
        // arr.push(result.data.savefilename);
        // setIimgList( [...arr] );
        // console.log(imgList);

    }

    async function onSubmit(){
        
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            
            <MainMenu setWord={setWord}/>

            <div className='postWrite'>
                <div className='title' >포스팅</div>
                <br></br>
                <div className='field' id='wpcontent'>
                    <label>내용</label>
                    <textarea rows="7" value={content} onChange={
                        (e)=>{ setContent( e.currentTarget.value ) }
                    }></textarea>
                </div>

                <div className='field' id='img1'style={divStyle1}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 1) }} />
                    {/* <label htmlFor="fileInput" className="custom-file-label">파일1 선택하기</label>
                    <input type="file" id="fileInput" style={{display: 'none'}} onChange={(e)=>{ imgUpload(e, 1) }} /> */}
                </div>
                <img src={imgsrc1} />

                <div className='field' id='img2' style={divStyle2}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 2) }} />
                    {/* <label htmlFor="fileInput" className="custom-file-label">파일2 선택하기</label>
                    <input type="file" id="fileInput" style={{display: 'none'}} onChange={(e)=>{ imgUpload(e, 2) }} /> */}
                </div>
                <img src={imgsrc2} />

                <div className='field' id='img3' style={divStyle3}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 3) }} />
                </div>
                <img src={imgsrc3} />

                <div className='field' id='img4' style={divStyle4}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 4) }} />
                </div>
                <img src={imgsrc4} />

                <div className='field' id='img5' style={divStyle5}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 5) }} />
                </div>
                <img src={imgsrc5} />

                <div className='field' id='img6' style={divStyle6}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 6) }} />
                </div>
                <img src={imgsrc6} />

                <div className='field' id='img7' style={divStyle7}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 7) }} />
                </div>
                <img src={imgsrc7} />

                <div className='field' id='img8' style={divStyle8}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 8) }} />
                </div>
                <img src={imgsrc8} />

                <div className='field' id='img9' style={divStyle9}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 9) }} />
                </div>
                <img src={imgsrc9} />

                <div className='field' id='img10' style={divStyle10}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 10) }} />
                </div>
                <img src={imgsrc10} />

                <div className='field' >
                    {/* <input type="text" /> */}
                    <button onClick={() => setModalOpen(true)}>카카오맵검색</button>
                </div>

                <div className='field' style={{width:"30vw",height:"20vh",border:"1px solid black",overflow: "auto"}}>
                    선택된 장소가 조회될 공간입니다.<br/>
                    {/* <h3>선택된 장소 정보:</h3> */}
                    장소 이름: {selectedPlace.placeName}<br></br>
                    도로명 주소: {selectedPlace.roadAddress}<br></br>
                    {/* <h3>기본 주소: {selectedPlace.placeUrl}</h3> */}
                    전화번호: {selectedPlace.phone}<br></br>
                    id: {selectedPlace.id}<br></br>
                    x좌표: {selectedPlace.x}<br></br>
                    y좌표: {selectedPlace.y}<br></br>
                    카카오맵 링크: <a href={selectedPlace.placeUrl} target="_blank" rel="noopener noreferrer">{selectedPlace.placeUrl}</a><br></br>
                    {/* <input type="hidden" name='category'></input>
                    <input type="hidden" name='place_name'></input>
                    <input type="hidden" name='3'></input>
                    <input type="hidden" name='4'></input> */}
                </div>

                    {
                    modalOpen &&
                    <div className={'modal-container'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                    }}>
                    <div className={'modal-content'}>
                        
                        <p>카카오맵 검색 결과가 조회됩니다<button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                        모달 닫기
                        </button></p>
                        
                        <form className="inputForm" onSubmit={handleSubmit}>
                            <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
                            <button type="submit">검색</button>
                        </form>
                        <MapContainer searchPlace={Place} setPlace={setPlace} setPlace_name={setPlace_name} setRoad_address_name={setRoad_address_name} setPhone={setPhone} setPlace_url={setPlace_url} setModalOpen={setModalOpen} setSelectedPlace={setSelectedPlace} movedLocation2={movedLocation2} setMovedLocation2={setMovedLocation2} options1={options1} setOptions1={setOptions1}/>
                                            

                    </div>
                    </div>
                    }

                <div className='btns'>
                    <button onClick={ ()=>{ onSubmit() } }>작성완료</button>
                    <button onClick={ ()=>{ navigate('/main') } }>Main으로</button>
                </div>

            </div>
        </div>
    )
}

export default WritePost
