package com.foodie.foodie.service;

import com.foodie.foodie.entity.Place;
import com.foodie.foodie.repository.PlaceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class PlaceService {

    @Autowired
    PlaceRepository PR;

    public Place getPlace(int id, Place insertplace) {
       Optional<Place> getplace = PR.findByKakaoplaceid((long)id);
        if( getplace.isPresent() ) {
            System.out.println("isPresent()");
            Place place = getplace.get();
            place.setReviewamount(place.getReviewamount()+1);

            double updatestars = (place.getAvestars()*place.getReviewamount()+insertplace.getAvestars())/(place.getReviewamount()+1);

            place.setAvestars(updatestars);

            System.out.println("수정 리뷰"+place.getReviewamount());
            System.out.println("수정 평균별점"+updatestars);
            

            System.out.println("isPresent()"+place);
            return place;
        }else{
            System.out.println("isEmpty()");
            insertplace.setReviewamount(insertplace.getReviewamount()+1);

            Place place = PR.save(insertplace);
            System.out.println("isEmpty()"+place);
            return place;
        }
    }


}
