import React, { useEffect, useState } from 'react'
import { CiGps } from "react-icons/ci";

import '../../style/mapcontainer.css'

const { kakao } = window

const MapContainer = ({ searchPlace, setPlace }) => {

  const [locationw, setLocationw] = useState();
  const [options, setOptions] = useState({
    center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
    // center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  });
  const [options1, setOptions1] = useState({      
    location: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),     
    radius: 1000,
    sort: kakao.maps.services.SortBy.DISTANCE,
  });
  const [lanw, setLanw] = useState();
  const [lonw, setLonw] = useState();

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

        // setOptions1({      
        //   location: new kakao.maps.LatLng(position.coords.latitude,position.coords.latitude),     
        //   radius: 1000,
        //   sort: kakao.maps.services.SortBy.DISTANCE,
        // })  
        // setPlace('')
    },
    (err) => {
        window.alert("위치 정보 접근을 허용해주세요");  
        setOptions({
          center: new kakao.maps.LatLng(37.57261013516411,126.99042333710086),
          // center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });
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

    const ps = new kakao.maps.services.Places()

    
      
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

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [searchPlace, options, options1])

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
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
            <button>상세보기</button><button>선택</button>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  )
}

export default MapContainer