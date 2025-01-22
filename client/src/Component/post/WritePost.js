import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';



import MainMenu from '../MainMenu';
import MapContainer from '../post/MapContainer';
import RatingStar from './RatingStars';

import '../../style/mapcontainer.css'
import '../../style/writepost.css'

const { kakao } = window

const WritePost = () => {
    const navigate=useNavigate();
    const [content, setContent] = useState('');
    const [word, setWord] = useState('')
    const [loginUser, setLoginUser ] = useState({});
    const lUser = useSelector( state=>state.user );
    const [stars, setStars] = useState();
    const [isHover, setIsHover] = useState([false, false, false, false, false]);
    const [beforeSetCategory, setBeforeSetCategory] = useState(0);
    const [category, setCategory] = useState('');
    

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    const [place_name,setPlace_name] = useState();
    const [road_address_name,setRoad_address_name] = useState();
    const [phone,setPhone] = useState();
    const [place_url,setPlace_url] = useState();
    const [selectedPlace,setSelectedPlace] = useState();

    const [options1, setOptions1] = useState(
        {
        location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
        radius: 1000,
        sort: kakao.maps.services.SortBy.DISTANCE,
      });

    const [movedLocation2,setMovedLocation2] =useState({})

    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    // async function selectOverlay(place){        
    //     if(!((place.category_group_code == 'FD6')||(place.category_group_code == 'CE7'))
    //     ){return alert("음식점만 선택해주세요") }
        
    //     // console.log("place.id"+place.id)

    //     let placeresult = await axios.post('/api/place/checkPlaceCategory', null ,{params: {kakaoplaceid:place.id}  } )
    //     setBeforeSetCategory(placeresult.data.category)

    //     setCategory(placeresult.data.category)
    //     setSelectedPlace(place);

    // }    

    async function selectButton(place){        
        if(!((place.category_group_code == 'FD6')||(place.category_group_code == 'CE7'))
        ){return alert("음식점만 선택해주세요") }
        
        // console.log("place.id"+place.id)

        let placeresult = await axios.post('/api/place/checkPlaceCategory', null ,{params: {kakaoplaceid:place.id}  } )
        setBeforeSetCategory(placeresult.data.category)

        setCategory(placeresult.data.category)
        setSelectedPlace(place);

    } 

    const categories = ["", "한식", "양식", "중식", "일식", "후식"];
    const categoryName1 = categories[category];
    const categoryName2 = categories[beforeSetCategory];

    
    

  
    const onChange = (e) => {
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()     

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
    

    async function imgUpload(e, n){
        let formData = new FormData();
        formData.append('image', e.target.files[0] );
        const result = await axios.post('/api/post/imgUp', formData);

        if( n == 1){
            setDivStyle2( fieldStyle );
            setImgsrc1( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 2){
            setDivStyle3( fieldStyle );
            setImgsrc2( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 3){
            setDivStyle4( fieldStyle );
            setImgsrc3( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 4){
            setDivStyle5( fieldStyle );
            setImgsrc4( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 5){
            setDivStyle6( fieldStyle );
            setImgsrc5( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 6){
            setDivStyle7( fieldStyle );
            setImgsrc6( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 7){
            setDivStyle8( fieldStyle );
            setImgsrc7( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 8){
            setDivStyle9( fieldStyle );
            setImgsrc8( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 9){
            setDivStyle10( fieldStyle );
            setImgsrc9( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }else if( n == 10){
            setImgsrc10( `${process.env.REACT_APP_ADDRESS2}/uploads/${result.data.savefilename}`);
        }

        let arr = [...imgList];
        arr.push(result.data.savefilename);
        setImgList( [...arr] );
        // console.log(imgList);

    }

    async function onSubmit(){
        if(!content){return alert('내용을 입력하세요');}
        if(!imgList) {return alert('이미지를 하나이상 선택하세요')}
        if(!stars) {return alert('별점을 선택하세요')}
        if(!category) {return alert('카테고리를 선택하세요')}
        
        if(!selectedPlace.place_name) {return alert('음식점을 선택하세요')}
        if(!selectedPlace) {return alert('음식점을 선택하세요')}

        // 데이터베이스에 place정보 있는지 조회
        let placeresult = await axios.post('/api/place/checkPlace', { place_name: selectedPlace.place_name, road_address_name:selectedPlace.road_address_name, phone:selectedPlace.phone, kakaoplaceid:selectedPlace.id, x:selectedPlace.x, y:selectedPlace.y, place_url:selectedPlace.place_url, avestars:stars, category:category } )

        let placeid = placeresult.data.place.placeid

        let memberid = lUser.memberid

        // content 와 작성자로  post 테이블에 레코드를 추가. 이때 insert 된 레코드의 id 를 리턴         

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
        <div className='postWriteContainer' 
        // style={{display:"flex", flexDirection:"column", alignItems:"center"}}
        >
            
            <MainMenu setWord={setWord}/>

            <div className='postWrite'>
                <div className='title' >포스팅</div>
                <br></br>
                <div className='field' id='wpcontent'>
                <div className='title' >내용</div>
                <div className='contents' ><textarea rows="7" value={content} onChange={
                        (e)=>{ setContent( e.currentTarget.value ) }
                    }></textarea></div>
                    
                </div>

                <div className='field' id='img1'style={divStyle1}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 1) }} />
                    
                </div>
                <img src={imgsrc1} />

                <div className='field' id='img2' style={divStyle2}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 2) }} />
                    
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
                    <br/>

                <div className='title' >별점</div>
                    
                    <div className='contents'>
                        {/* <label>
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

                        <br/> */}
                        <br/>
                    <RatingStar setStars={setStars} isHover={isHover} setIsHover={setIsHover}></RatingStar>
                        
                        {stars?(`${stars}`+"점입니다."):("별점을 선택해주세요")}   

                        
                    </div>

                </div>

                

                <div className='field' >
                    {/* <input type="text" /> */}
                    
                </div>

                <div className='field' >
                        <div className='title'>
                            장소검색
                            {/* <button onClick={() => setModalOpen(true)}>검색</button> */}
                        </div>

                        <div className='contents' style={{width:"100%",height:"20vh",border:"1px solid rgb(242, 38, 38)",borderRadius:"10px",overflow: "auto"}} >
                    

                    {selectedPlace? (
                        
                            <div>
                            <p>장소 이름: {selectedPlace.place_name}</p>
                            <p>도로명 주소: {selectedPlace.road_address_name}</p>
                            {/* <h3>기본 주소: {selectedPlace.placeUrl}</h3> */}
                            <p>전화번호: {selectedPlace.phone}</p>
                            <p>id: {selectedPlace.id}</p>
                            <p>x좌표: {selectedPlace.x}</p>
                            <p>y좌표: {selectedPlace.y}</p>
                            <p>카카오맵 링크: <a href={selectedPlace.place_url} target="_blank" rel="noopener noreferrer">{selectedPlace.place_url}</a></p>

                            <button onClick={() => setModalOpen(true)}>재검색</button>
                            </div>
                            
                        
                        ) : (
                        <p>장소를 검색해주세요<br/>

                            <button onClick={() => setModalOpen(true)}>검색</button>
                        </p>
                    )}      




                                     
                    </div>

                </div>

                { beforeSetCategory==0 ?(  
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
                        
                        {category ? (
                            `카테고리 ${categoryName1} 입니다.`
                        ) : (
                            "카테고리를 선택해주세요"
                        )}
                        
                        
                        {/* {category} 입니다. */}
                    </div>
                </div>
                ):(`카테고리 ${categoryName2} 입니다.`)}

                    {
                    modalOpen &&
                    <div className={'modal-container'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                    }}>
                    <div className={'modal-content'}>
                        
                        <p>검색 결과가 조회됩니다<button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                        모달 닫기
                        </button></p>
                        
                        <form className="inputForm" onSubmit={handleSubmit}>
                            <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
                            <button type="submit">검색</button>
                        </form>
                        <MapContainer searchPlace={Place} setPlace={setPlace} setPlace_name={setPlace_name} setRoad_address_name={setRoad_address_name} setPhone={setPhone} setPlace_url={setPlace_url} setModalOpen={setModalOpen} setSelectedPlace={setSelectedPlace} movedLocation2={movedLocation2} setMovedLocation2={setMovedLocation2} options1={options1} setOptions1={setOptions1} selectButton={selectButton}/>
                                            

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
