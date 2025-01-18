package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByKakaoplaceid(long id);
}
