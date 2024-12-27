package com.Santa.Logistics.Controllers;


import com.Santa.Logistics.Entities.Order;
import com.Santa.Logistics.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Endpoint to create a new order
    @PostMapping("/create")
    public Order createOrder(@RequestParam String userId, @RequestParam String giftName) {
        // Create the order with the provided userId and giftName
        return orderService.createOrder(userId, giftName);
    }

//    @GetMapping("/{id}")
//    public Order getOrderById(@PathVariable String id) {
//        return orderService.getOrderById(id);
//    }

    @PostMapping("/{orderId}/updateProgress")
    public Order updateDeliveryProgress(@PathVariable String orderId) {
        orderService.updateDeliveryProgress(orderId);
        return orderService.getOrderById(orderId);
    }

    // New endpoint to get all orders by user ID
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable String userId) {
        return orderService.getOrdersByUserId(userId);
    }


}
