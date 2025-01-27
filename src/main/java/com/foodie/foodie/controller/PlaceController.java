package com.foodie.foodie.controller;

import com.foodie.foodie.entity.Place;
import com.foodie.foodie.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/place")
public class PlaceController {

    @Autowired
    PlaceService pcs;

    @PostMapping("/checkPlace")
    public HashMap<String, Object> checkPlace(@RequestBody Place place) {

        HashMap<String, Object> result = new HashMap<String, Object>();

        System.out.println("place"+place);

        Place p = pcs.getPlace(place.getKakaoplaceid(),place);

        System.out.println("리턴될 장소정보:"+p);

        result.put("place", p);

        return result;
    }

    @PostMapping("/checkPlaceCategory")
    public HashMap<String, Object> checkPlaceCategory(@RequestParam("kakaoplaceid") int kakaoplaceid) {
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("kakaoplaceid"+kakaoplaceid);

        int category = pcs.checkPlaceCategory(kakaoplaceid);

        result.put("category", category);
        return result;

    }


    @GetMapping("/getPlaceInfo")
    public HashMap<String, Object> getPlaceInfo(@RequestParam("placeid") int placeid) {
        HashMap<String, Object> result = new HashMap<String, Object>();

        System.out.println("placeid"+placeid);

        Place p = pcs.getPlaceInfo(placeid);

        System.out.println("리턴될 장소정보:"+p);

        result.put("place", p);

        return result;
    }

    @GetMapping("/getPlaceList")
    public HashMap<String, Object> getPlaceList(@RequestParam("searchPlace") String searchPlace) {
        HashMap<String, Object> result = new HashMap<>();

        System.out.println("searchPlace"+searchPlace);
        List<Place> list = pcs.getPlaceList(searchPlace);
        result.put("placeList", list);
        return result;
    }



    @GetMapping("/getPlaceListByCategory")
    public HashMap<String, Object> getPlaceListByCategory(@RequestParam("category") int category) {
        HashMap<String, Object> result = new HashMap<>();

        System.out.println("category"+category);
        List<Place> list = pcs.getPlaceListByCategory(category);
        result.put("placeList", list);
        return result;
    }



}


