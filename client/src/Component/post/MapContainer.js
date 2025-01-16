import React, { useEffect, useState, useRef  } from 'react'
import { CiGps } from "react-icons/ci";

import '../../style/mapcontainer.css'

const { kakao } = window

const MapContainer = ({ searchPlace, setPlace ,setPlace_name, setRoad_address_name, setPhone, setPlace_url, setModalOpen, setSelectedPlace, setMovedLocation2, movedLocation2, options1 , setOptions1}) => {

  const [locationw, setLocationw] = useState();
  const [options, setOptions] = useState({
    center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
    // center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  });
  // const [options1, setOptions1] = useState(
  //   {      
  //   location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),     
  //   radius: 1000,
  //   sort: kakao.maps.services.SortBy.DISTANCE,
  // });
  const [lanw, setLanw] = useState(37.57261013516411);
  const [lonw, setLonw] = useState(126.99042333710086);

  const getLocationw = () => {

    // setLocation(movedLocation);    

    navigator.geolocation.getCurrentPosition(
    (position) => {
        // setLocationw({lat:position.coords.latitude, lng:position.coords.longitude});
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)

        setOptions({
          center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
          // center: new kakao.maps.LatLng(37.56586697223271, 127.02862994446544),
          // center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });

        setLanw(position.coords.latitude)
        setLonw(position.coords.longitude)

        setOptions1({      
          location: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),    
          radius: 1000,
          sort: kakao.maps.services.SortBy.DISTANCE,
        })  
        setPlace('')
        // setInputText('')
    },
    (err) => {
        window.alert("위치 정보 접근을 허용해주세요");  
        setOptions({
          center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
          // center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });
        setLanw(37.57261013516411)
        setLonw(126.99042333710086)
        // setLocationw({lat:37.57261013516411,lng:126.99042333710086});          
    }
    );
};    

  
  

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {    

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')    

    
    // const options = {
    //   center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
    //   // center: new kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // }
    
    const map = new kakao.maps.Map(container, options)

    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(25, 40), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lanw, lonw),
        image: markerImage
      })

      var content = '<div id="overlaywrap">' + 
            '    <div id="overlayinfo">' + 
            '        <div id="overlaytitle">' + 
            '            현재위치' + 
            // '            <div id="overlayclose" onclick="closeOverlay()">X</div>' + 
            '        </div>' +            
            '    </div>' +    
            '</div>';

    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()       
    });

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const ps = new kakao.maps.services.Places()

    kakao.maps.event.addListener(map, 'dragend', function() {        
    
      // 지도 중심좌표를 얻어옵니다 
      var latlng = map.getCenter(); 

      setMovedLocation2({lat:latlng.getLat(),lng:latlng.getLng()})

      // console.log({lat:latlng.getLat(),lng:latlng.getLng()})

      // var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
      // message += '경도는 ' + latlng.getLng() + ' 입니다';
      
      // var resultDiv = document.getElementById('result');  
      // resultDiv.innerHTML = message;
      
  });
      
    // var options1 = {
      
    //   location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),     
    //   radius: 1000,
    //   sort: kakao.maps.services.SortBy.DISTANCE,
    // };

    ps.keywordSearch(searchPlace, placesSearchCB, options1)

    function placesSearchCB(data, status, pagination) {


      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

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

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      })
    }
  }, [searchPlace, options, options1])


  const placeRefs = useRef([]);

  const Selection = (i) => {

    // const placeElement = placeRefs.current[i];
    
    // setPlace_name(placeElement.innerText)
    // setRoad_address_name()
    // setPhone()
    // setPlace_url()

    const placeNameElement = placeRefs.current[`${Places[i].id}-place_name`];
    const roadAddressElement = placeRefs.current[`${Places[i].id}-road_address_name`];
    // const addressElement = placeRefs.current[`${Places[i].id}-address_name`];
    const phoneElement = placeRefs.current[`${Places[i].id}-phone`];
    const idElement = placeRefs.current[`${Places[i].id}-id`];
    const xElement = placeRefs.current[`${Places[i].id}-x`];
    const yElement = placeRefs.current[`${Places[i].id}-y`];
    const placeurlElement = placeRefs.current[`${Places[i].id}-place_url`];

    const place = {
      placeName: placeNameElement ? placeNameElement.innerText : '',
      roadAddress: roadAddressElement ? roadAddressElement.innerText : '',
      // address: addressElement ? addressElement.innerText : '',
      phone: phoneElement ? phoneElement.innerText : '',
      id: idElement? idElement.innerHTML : '',
      x: xElement? xElement.innerHTML : '',
      y: yElement? yElement.innerHTML : '',
      placeUrl: placeurlElement? placeurlElement.innerHTML : '',
    };

    setSelectedPlace(place);

    setModalOpen(false)
  }


  

  return (
    <div id='MapContainer'>
      <CiGps style={{ width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{getLocationw()}}/>

      {/* <CiGps style={{ position: 'fixed', top:'2%',right:'4%',width: '50px', height: '50px',borderRadius: '5px',boxShadow: '0 0 10px' }} onClick={()=>{getLocation()}}/> */}
      
      <div
        id="myMap"
        style={{
          width: '500px',
          height: '500px',
        }}
      ></div>
      
      
      <div id="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5 ref={(el) => placeRefs.current[`${item.id}-place_name`] = el} id={`${item.id}-place_name`}>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span ref={(el) => placeRefs.current[`${item.id}-road_address_name`] = el} id={`${item.id}-road_address_name`}>{item.road_address_name}</span><br></br>
                  <span>({item.address_name})</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span ref={(el) => placeRefs.current[`${item.id}-phone`] = el} id={`${item.id}-phone`}>{item.phone}</span><br/>

              <span style={{display:"block"}} ref={(el) => placeRefs.current[`${item.id}-id`] = el} id={`${item.id}-id`}>{item.id}</span><br/>

              <span style={{display:"block"}} ref={(el) => placeRefs.current[`${item.id}-x`] = el} id={`${item.x}-x`}>{item.x}</span><br/>

              <span style={{display:"block"}} ref={(el) => placeRefs.current[`${item.id}-y`] = el} id={`${item.ㅛ}-y`}>{item.y}</span><br/>

              <span style={{display:"none"}} ref={(el) => placeRefs.current[`${item.id}-place_url`] = el} id={`${item.place_url}-place_url`}>{item.place_url}</span><br/>

              <button onClick={() => window.open(item.place_url, '_blank')}>카카오맵에서 보기</button>
            </div>
            <button onClick={() => Selection(i)}>선택</button>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  )
}

export default MapContainer