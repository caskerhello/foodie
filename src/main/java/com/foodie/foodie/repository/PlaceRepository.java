package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByKakaoplaceid(long id);

    Place findByPlaceid(int placeid);

    List<Place> findByPlaceNameContaining(String searchPlace);

    List<Place> findByCategory(int category);
}
