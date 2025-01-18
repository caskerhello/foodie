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

    const [stars, setStars] = useState('');
    const [category, setCategory] = useState('');
    



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

        // if(!movedLocation2.lat)console.log(movedLocation2.lat)

        
        




      setOptions1({
        location: new kakao.maps.LatLng(
            movedLocation2.lat,
            movedLocation2.lng
        ),
        radius: 1000,
        sort: kakao.maps.services.SortBy.DISTANCE,
      })


      if(!movedLocation2.lat){
            setOptions1({
                location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
                radius: 1000,
                sort: kakao.maps.services.SortBy.DISTANCE,
              })
        }

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

    const [imgList, setImgList] = useState([]);

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
        let formData = new FormData();
        formData.append('image', e.target.files[0] );
        const result = await axios.post('/api/post/imgup', formData);

        if( n == 1){
            setDivStyle2( fieldStyle );
            setImgsrc1( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 2){
            setDivStyle3( fieldStyle );
            setImgsrc2( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 3){
            setDivStyle4( fieldStyle );
            setImgsrc3( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 4){
            setDivStyle5( fieldStyle );
            setImgsrc4( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 5){
            setDivStyle6( fieldStyle );
            setImgsrc5( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 6){
            setDivStyle7( fieldStyle );
            setImgsrc6( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 7){
            setDivStyle8( fieldStyle );
            setImgsrc7( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 8){
            setDivStyle9( fieldStyle );
            setImgsrc8( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 9){
            setDivStyle10( fieldStyle );
            setImgsrc9( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if( n == 10){
            setImgsrc10( `http://localhost:8070/uploads/${result.data.savefilename}`);
        }

        let arr = [...imgList];
        arr.push(result.data.savefilename);
        setImgList( [...arr] );
        console.log(imgList);

    }

    async function onSubmit(){
        if(!content){return alert('내용을 입력하세요');}
        if(!imgList) {return alert('이미지를 하나이상 선택하세요')}
        if(!stars) {return alert('별점을 선택하세요')}
        if(!category) {return alert('카테고리를 선택하세요')}
        if(!selectedPlace) {return alert('음식점을 선택하세요')}

        // 데이터베이스에 place정보 있는지 조회
        let placeresult = await axios.post('/api/place/checkPlace', { placeName: selectedPlace.placeName, roadAddress:selectedPlace.roadAddress, phone:selectedPlace.phone, kakaoplaceid:selectedPlace.id, x:selectedPlace.x, y:selectedPlace.y, placeUrl:selectedPlace.placeUrl, avestars:stars, category:category } )

        let placeid = placeresult.data.place.placeid

        let memberid = 1

        // content 와 작성자로  post 테이블에 레코드를 추가. 이때 insert 된 레코드의 id 를 리턴 
        // console.log("selectedPlace"+JSON.stringify(selectedPlace))

        let writepostresult = await axios.post('/api/post/writePost', { placeid, content, memberid, stars} )
        let postid = writepostresult.data.postid;

        

        // 리턴 아이디와  이미지 이름들로  images 테이블에 레코드들을 추가
        for( let i=0; i<imgList.length; i++){
            await axios.post('/api/post/writeImages', { postid, savefilename:imgList[i] });
        }
        //window.location.href='http://localhost:3000/main
        navigate('/main');
        
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

                <div className='field' id='wpstars'>
                <div className='title' >별점</div>
                    
                    <div className='contents'>
                        <label>
                            ★
                            <input type="radio" name='stars' onClick={()=>{setStars(1)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            ★★
                            <input type="radio" name='stars' onClick={()=>{setStars(2)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            ★★★
                            <input type="radio" name='stars' onClick={()=>{setStars(3)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            ★★★★
                            <input type="radio" name='stars' onClick={()=>{setStars(4)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            ★★★★★
                            <input type="radio" name='stars' onClick={()=>{setStars(5)}}></input>
                            &nbsp;
                        </label>
                        <br/>
                        
                        {stars}점 입니다.
                    </div>
                </div>

                

                <div className='field' >
                    {/* <input type="text" /> */}
                    
                </div>

                <div className='field' >
                        <div className='title'><button onClick={() => setModalOpen(true)}>카카오맵검색</button></div>

                        <div className='contents' style={{width:"40vw",height:"20vh",border:"1px solid black",overflow: "auto"}} >
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

                </div>


                <div className='field' id='wpcategory' >
                    <div className='title' >카테고리</div>
                    
                    <div className='contents' >
                        <label>
                            한식
                            <input type="radio" name='category' onClick={()=>{setCategory(1)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            양식
                            <input type="radio" name='category' onClick={()=>{setCategory(2)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            중식
                            <input type="radio" name='category' onClick={()=>{setCategory(3)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            일식
                            <input type="radio" name='category' onClick={()=>{setCategory(4)}}></input>
                            &nbsp;
                        </label>

                        <label>
                            후식
                            <input type="radio" name='category' onClick={()=>{setCategory(5)}}></input>
                            &nbsp;
                        </label>
                        <br/>                        
                        
                        카테고리 {category} 입니다.
                    </div>
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
