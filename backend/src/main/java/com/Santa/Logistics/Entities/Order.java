package com.Santa.Logistics.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Data
@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String userId;
    private String giftName;
    private String warehouseLocation = "19.018255,72.847938";
    private String status;
    private List<Location> deliveryProgress;

    @Data
    public static class Location {
        private double lat;
        private double lng;
        private String timestamp;

    }
}
