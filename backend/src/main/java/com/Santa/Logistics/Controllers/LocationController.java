package com.Santa.Logistics.Controllers;

import com.Santa.Logistics.Entities.UserLocation;
import com.Santa.Logistics.Services.UserLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
public class LocationController {
    @Autowired
    private UserLocationService locationService;


    @PostMapping
    public ResponseEntity<?> saveLocation(@RequestBody UserLocation location) {
        if (location.getUserId() == null || location.getAddress() == null) {
            return ResponseEntity.badRequest().body("User ID and address are required.");
        }
        UserLocation savedLocation = locationService.saveLocation(location);
        return ResponseEntity.ok(savedLocation);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserLocation> getLocation(@PathVariable String userId) {
        UserLocation location = locationService.getLocationByUserId(userId);
        return ResponseEntity.ok(location);
    }

}
