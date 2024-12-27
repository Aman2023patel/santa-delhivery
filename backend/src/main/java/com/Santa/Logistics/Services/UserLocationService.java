package com.Santa.Logistics.Services;

import com.Santa.Logistics.Entities.UserLocation;
import com.Santa.Logistics.Repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLocationService {

    @Autowired
    private UserLocationRepository userLocationRepository;

    public UserLocation saveLocation(UserLocation location) {
        // Check if location with the same userId exists
        UserLocation existingLocation = userLocationRepository.findByUserId(location.getUserId());

        if (existingLocation != null) {
            // Update the existing location
            existingLocation.setLatitude(location.getLatitude());
            existingLocation.setLongitude(location.getLongitude());
            existingLocation.setAddress(location.getAddress());
            return userLocationRepository.save(existingLocation);
        }

        // Save new location if no existing entry is found
        return userLocationRepository.save(location);
    }

    public UserLocation getLocationByUserId(String userId) {
        return userLocationRepository.findByUserId(userId);
    }







//    public UserLocation saveLocation(UserLocation location) {
//        return userLocationRepository.save(location);
//    }
//
//    public UserLocation getLocationByUserId(String userId) {
//        return userLocationRepository.findByUserId(userId);
//    }
}
