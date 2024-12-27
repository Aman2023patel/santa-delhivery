package com.Santa.Logistics.Repository;

import com.Santa.Logistics.Entities.Route;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RouteRepository extends MongoRepository<Route,String> {
}
