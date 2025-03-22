import React, { useEffect, useState, useRef  } from 'react'
import { CiGps } from "react-icons/ci";

import '../../style/mapcontainer.css'

const { kakao } = window

const MapContainer = ({
  searchPlace,
  setPlace,
  setPlace_name,
  setRoad_address_name,
  setPhone, setPlace_url,
  setModalOpen, 
  setSelectedPlace,
  setMovedLocation2,
  movedLocation2,
  options1,
  setOptions1,
  selectButton,
  onSubmitEnter,
  setCurrentLocation 
}) => {
  const [locationw, setLocationw] = useState();
  const [options, setOptions] = useState({
    center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
    
    level: 3,
  });
  
  const [lanw, setLanw] = useState(37.57261013516411);
  const [lonw, setLonw] = useState(126.99042333710086);

  const getLocationW = () => {

    

    navigator.geolocation.getCurrentPosition(
    (position) => {
        
        
        setOptions({
          center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
          level: 3,
        });

        setLanw(position.coords.latitude)
        setLonw(position.coords.longitude)

        setCurrentLocation({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        })

        setOptions1({
          location: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
          radius: 1000,
          sort: kakao.maps.services.SortBy.DISTANCE,
        })
        setPlace('')
        
    },
    (err) => {
        window.alert("위치 정보 접근을 허용해주세요");  
        setOptions({
          center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
          level: 3,
        });
        setOptions1({
          location: new kakao.maps.LatLng(37.57261013516411, 126.99042333710086),
          radius: 1000,
          sort: kakao.maps.services.SortBy.DISTANCE,
        })
        setLanw(37.57261013516411)
        setLonw(126.99042333710086)

    }
    );
};

  
  

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')

    // 이걸 기준으로 맵 렌더링하므로 일부러 남겨둔 주석

    // const options = {
    //   center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
    //   // center: new kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // }
    
    //맵 렌더링링
    const map = new kakao.maps.Map(container, options)

    //마커 옵션 설정
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(25, 40), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    //마커 생성
    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lanw, lonw),
        image: markerImage
      })

      //오버레이 내용 설정
      var content = '<div id="overlaywrap">' + 
            '    <div id="overlayinfo">' + 
            '        <div id="overlaytitle">' + 
            '            현재위치' + 
            // '            <div id="overlayclose" onclick="closeOverlay()">X</div>' + 
            '        </div>' +            
            '    </div>' +    
            '</div>';

    //오버레이 생성
    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()       
    });

    //줌바 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const ps = new kakao.maps.services.Places()

    //지도 움직인후 중심 좌표 추적 > 여기 기준으로 검색
    kakao.maps.event.addListener(map, 'dragend', function() {
    
      // 지도 중심좌표를 얻어옵니다
      var latlng = map.getCenter();

      setMovedLocation2({lat:latlng.getLat(),lng:latlng.getLng()})
      
  });
      
    //키워드 검색     키워드        콜백함수        검색범위등
    ps.keywordSearch(searchPlace, placesSearchCB, options1)

    //장소 검색 작업(비동기 실행)이 끝난 후 실행할 함수
    function placesSearchCB(data, status, pagination) {


      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        //마커 표시&지도 범위 설정
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        //지도 범위 설정
        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces('')
        setPlaces(data)
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    //마커표시함수
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      //마커 마우스 오버시 오버레이 생성
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        const content = `
        <div style="padding:5px;font-size:12px;">
            ${place.place_name}
            <button id="select-btn-${place.id}">선택</button>
        </div>
        `;

        infowindow.setContent(content);
        infowindow.open(map, marker)

        //버튼 기능
          const button = document.getElementById(`select-btn-${place.id}`);
        if (button) {
            button.addEventListener('click', function() {
                selectButton(place);
                setModalOpen(false);
            });
        }
      })

      //마우스 아웃 오버레이 제거
      kakao.maps.event.addListener(marker, 'mouseout', function () {
        setTimeout(function() {
          infowindow.close();
        }, 2000);
      })
    }
  }, [searchPlace, options, options1])


  // const placeRefs = useRef([]);


  return (
    <div id='mapContainer'>
      
      {/* 지도 범위 */}
      <div
        id="myMap"
        style={{
          width: '600px',
          height: '500px',
          borderRadius:"20px",
          boxShadow:"0px 0px 5px",
        }}
      ></div>

        {/* 현재 위치로 지도 중심 설정버튼 */}
      <CiGps style={{position:"absolute",zIndex:"1", width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{getLocationW()}}/>
      
      
      <div id="resultList">

        {/* 검색 문제 발생시 범위 체크 위해 필요 */}
        {/* 위도 {options1.x} 과 경도 {options1.y} 를 기준으로 
        {options1.radius} m 반경내 검색합니다. */}


        {Places.map((item, i) => (
          <div key={i} style={{ marginBottom: '20px' }} className='mapContainerResult'>
            <div className='mapContainerResultTitle'>{i + 1} {item.place_name}</div><br/>
            <div className='mapContainerResultContents'>{item.category_name}</div><br/>
            
            {/* <div></div> */}

            {item.road_address_name ? (
              <div className='mapContainerResultContents'>
                <span>{item.road_address_name}</span><br></br>
                {/* <span>({item.address_name})</span> */}
              </div>
            ) : (
              <span>{item.address_name}</span>
            )}<br/>

            <div className='mapContainerResultContents'>{item.phone}</div><br/>

            {/* 카카오 맵에서 얻어올수 있는 다른 정보들.. */}
            {/* <span style={{display:"none"}}>{item.category_group_code}</span>

            <span style={{display:"none"}}>{item.id}</span>

            <span style={{display:"none"}}>{item.x}</span>

            <span style={{display:"none"}}>{item.y}</span>

            <span style={{display:"none"}}>{item.place_url}</span> */}

            <div className='btns'>
              <button onClick={() => window.open(item.place_url, '_blank')}>카카오맵에서 보기</button> &nbsp;
              <button onClick={() => { selectButton(item); setModalOpen(false); }}>선택</button>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  )
}

export default MapContainer