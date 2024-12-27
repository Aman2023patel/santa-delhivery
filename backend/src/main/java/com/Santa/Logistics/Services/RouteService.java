package com.Santa.Logistics.Services;

import com.Santa.Logistics.Entities.Route;
import com.Santa.Logistics.Repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    public Route createRoute(Route route) {
        return routeRepository.save(route); // Save a new route
    }

    public Route getRoute(String routeId) {
        return routeRepository.findById(routeId).orElse(null); // Fetch route by ID
    }
}
