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

        Place p = pcs.getPlace(place.getKakaoplaceid(),place);

        result.put("place", p);

        return result;
    }

    @PostMapping("/checkPlaceCategory")
    public HashMap<String, Object> checkPlaceCategory(@RequestParam("kakaoplaceid") int kakaoplaceid) {
        HashMap<String, Object> result = new HashMap<>();

        int category = pcs.checkPlaceCategory(kakaoplaceid);

        result.put("category", category);
        return result;

    }


    @GetMapping("/getPlaceInfo")
    public HashMap<String, Object> getPlaceInfo(@RequestParam("placeid") int placeid) {
        HashMap<String, Object> result = new HashMap<String, Object>();

        Place p = pcs.getPlaceInfo(placeid);

        result.put("place", p);

        return result;
    }

    @GetMapping("/getPlaceList")
    public HashMap<String, Object> getPlaceList(@RequestParam("searchPlace") String searchPlace) {
        HashMap<String, Object> result = new HashMap<>();

        List<Place> list = pcs.getPlaceList(searchPlace);
        result.put("placeList", list);
        return result;
    }

    @GetMapping("/getPlaceListByStars")
    public HashMap<String, Object> getPlaceListByStars(@RequestParam("searchPlace") String searchPlace) {
        HashMap<String, Object> result = new HashMap<>();

        List<Place> list = pcs.getPlaceListByStars(searchPlace);
        result.put("placeList", list);
        return result;
    }

    @GetMapping("/getPlaceListByReviews")
    public HashMap<String, Object> getPlaceListByReviews(@RequestParam("searchPlace") String searchPlace) {
        HashMap<String, Object> result = new HashMap<>();

        List<Place> list = pcs.getPlaceListByReviews(searchPlace);
        result.put("placeList", list);
        return result;
    }



    @GetMapping("/getPlaceListByCategory")
    public HashMap<String, Object> getPlaceListByCategory(@RequestParam("category") int category) {
        HashMap<String, Object> result = new HashMap<>();

        List<Place> list = pcs.getPlaceListByCategory(category);
        result.put("placeList", list);
        return result;
    }

    @GetMapping("/getPlaceListByCategoryByStars")
    public HashMap<String, Object> getPlaceListByCategoryByStars(@RequestParam("category") int category) {
        HashMap<String, Object> result = new HashMap<>();

        List<Place> list = pcs.getPlaceListByCategoryByStars(category);
        result.put("placeList", list);
        return result;
    }

    @GetMapping("/getPlaceListByCategoryByReviews")
    public HashMap<String, Object> getPlaceListByCategoryByReviews(@RequestParam("category") int category) {
        HashMap<String, Object> result = new HashMap<>();

        List<Place> list = pcs.getPlaceListByCategoryByReviews(category);
        result.put("placeList", list);
        return result;
    }






}


