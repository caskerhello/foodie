package com.foodie.foodie.controller;

import com.foodie.foodie.entity.Place;
import com.foodie.foodie.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

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

    @GetMapping("/getPlaceInfo")
    public HashMap<String, Object> getPlaceInfo(@RequestParam("placeid") int placeid) {
        HashMap<String, Object> result = new HashMap<String, Object>();

        System.out.println("placeid"+placeid);

        Place p = pcs.getPlaceInfo(placeid);

        System.out.println("리턴될 장소정보:"+p);

        result.put("place", p);

        return result;
    }





}


