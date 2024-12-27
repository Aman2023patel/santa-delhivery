package com.Santa.Logistics.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user_locations")
public class UserLocation {
    @Id
    private String id;
    private String userId;
    private String latitude;
    private String longitude;
    private String address;
}
