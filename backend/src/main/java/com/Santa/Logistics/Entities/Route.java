package com.Santa.Logistics.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "routes")
public class Route {

    @Id
    private String routeId;
    private String location;
    private String estimatedTime;

}
