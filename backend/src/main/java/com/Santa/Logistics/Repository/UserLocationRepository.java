package com.Santa.Logistics.Repository;

import com.Santa.Logistics.Entities.UserLocation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserLocationRepository extends MongoRepository<UserLocation, String> {
    UserLocation findByUserId(String userId);
}