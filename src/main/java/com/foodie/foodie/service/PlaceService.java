package com.foodie.foodie.service;

import com.foodie.foodie.entity.Place;
import com.foodie.foodie.repository.PlaceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlaceService {

    @Autowired
    PlaceRepository pr;

    public Place getPlace(int id, Place insertplace) {
       Optional<Place> getplace = pr.findByKakaoplaceid((long)id);
        if( getplace.isPresent() ) {
            System.out.println("isPresent()");
            Place place = getplace.get();


            double updatestars = (place.getAvestars()*place.getReviewamount()+insertplace.getAvestars())/(place.getReviewamount()+1);

            place.setReviewamount(place.getReviewamount()+1);

            // 소수점 첫째 자리까지 버림 처리
//            updatestars = Math.floor(updatestars * 10.0) / 10.0;

            place.setAvestars(updatestars);

            System.out.println("수정 리뷰"+place.getReviewamount());
            System.out.println("수정 평균별점"+updatestars);
            

            System.out.println("isPresent()"+place);
            return place;
        }else{
            System.out.println("isEmpty()");
            insertplace.setReviewamount(insertplace.getReviewamount()+1);

            Place place = pr.save(insertplace);
            System.out.println("isEmpty()"+place);
            return place;
        }
    }


    public Place getPlaceInfo(int placeid) {
        return pr.findByPlaceid(placeid);
    }

    public int checkPlaceCategory(int kakaoplaceid) {
        Optional<Place> getplace = pr.findByKakaoplaceid((long)kakaoplaceid);

        if( getplace.isPresent() ) {
            Place place = getplace.get();
            return place.getCategory();
        }
        else{
            return 0;
        }
    }

    public List<Place> getPlaceList(String searchPlace) {
//        return pr.findByPlaceNameContainingOrderByPlaceidDesc(searchPlace);
        return pr.findByPlaceNameContainingRandom(searchPlace);
    }

    public List<Place> getPlaceListByCategory(int category) {
//        return pr.findByCategoryOrderByPlaceidDesc(category);
        return pr.findByCategoryRandom(category);
    }
}
