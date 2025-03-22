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
            Place place = getplace.get();


            double updatestars = (place.getAvestars()*place.getReviewamount()+insertplace.getAvestars())/(place.getReviewamount()+1);

            place.setReviewamount(place.getReviewamount()+1);

            place.setAvestars(updatestars);

            return place;
        }else{
            insertplace.setReviewamount(insertplace.getReviewamount()+1);

            Place place = pr.save(insertplace);
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

    public List<Place> getPlaceListByStars(String searchPlace) {
        return pr.findByPlaceNameContainingOrderByAvestarsDesc(searchPlace);
    }

    public List<Place> getPlaceListByReviews(String searchPlace) {
        return pr.findByPlaceNameContainingOrderByReviewamountDesc(searchPlace);
    }

    public List<Place> getPlaceListByCategory(int category) {
//        return pr.findByCategoryOrderByPlaceidDesc(category);
        return pr.findByCategoryRandom(category);
    }

    public List<Place> getPlaceListByCategoryByStars(int category) {
        return pr.findByCategoryOrderByAvestarsDesc(category);
    }

    public List<Place> getPlaceListByCategoryByReviews(int category) {
        return pr.findByCategoryOrderByReviewamountDesc(category);
    }


}
