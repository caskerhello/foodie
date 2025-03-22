package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByKakaoplaceid(long id);

    Place findByPlaceid(int placeid);

    List<Place> findByPlaceNameContaining(String searchPlace);

    List<Place> findByCategory(int category);

    List<Place> findByPlaceNameContainingOrderByPlaceidDesc(String searchPlace);

    List<Place> findByCategoryOrderByPlaceidDesc(int category);

    @Query("SELECT p FROM Place p WHERE p.placeName LIKE %:searchPlace% ORDER BY RAND()")
    List<Place> findByPlaceNameContainingRandom(@Param("searchPlace") String searchPlace);

    List<Place> findByPlaceNameContainingOrderByAvestarsDesc(String searchPlace);

    List<Place> findByPlaceNameContainingOrderByReviewamountDesc(String searchPlace);

    @Query("SELECT p FROM Place p WHERE p.category = :category ORDER BY RAND()")
    List<Place> findByCategoryRandom(@Param("category") int category);

    List<Place> findByCategoryOrderByAvestarsDesc(int category);

    List<Place> findByCategoryOrderByReviewamountDesc(int category);


}
