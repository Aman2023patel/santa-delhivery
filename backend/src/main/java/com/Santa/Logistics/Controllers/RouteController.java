package com.Santa.Logistics.Controllers;


import com.Santa.Logistics.Entities.Route;
import com.Santa.Logistics.Services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping("/create")
    public Route createRoute(@RequestBody Route route) {
        return routeService.createRoute(route);
    }

    @GetMapping("/{routeId}")
    public Route getRoute(@PathVariable String routeId) {
        return routeService.getRoute(routeId);
    }
}
