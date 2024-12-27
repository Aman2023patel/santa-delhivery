package com.Santa.Logistics.Services;

import com.Santa.Logistics.Entities.Order;
import com.Santa.Logistics.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    // Method to fetch orders by user ID
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    // Method to create an order
    public Order createOrder(String userId, String giftName) {
        // Create a new Order object
        Order order = new Order();
        order.setUserId(userId);
        order.setGiftName(giftName);
        order.setStatus("In Progress");  // Default status when the order is placed
        order.setDeliveryProgress(new ArrayList<>());  // Initialize with an empty delivery progress list

        // Save the order into the database
        Order savedOrder = orderRepository.save(order);

        // Start delivery logic (this is just an example)
        startDeliverySimulation(savedOrder);

        return savedOrder;
    }

    // Method to simulate updating delivery progress
    private void startDeliverySimulation(Order order) {
        // Simulate delivery progress with multiple locations
        List<Order.Location> locations = new ArrayList<>();
        locations.add(createLocation(19.018255, 72.847938, "2024-12-26T12:00:00Z", "Warehouse"));
        locations.add(createLocation(19.020000, 72.850000, "2024-12-26T13:00:00Z", "Transit"));
        locations.add(createLocation(19.022000, 72.853000, "2024-12-26T14:00:00Z", "Delivered"));

        // Update the delivery progress
        order.setDeliveryProgress(locations);

        // Update the status
        order.setStatus("In Transit");

        // Save the updated order with progress and status
        orderRepository.save(order);
    }

    private Order.Location createLocation(double lat, double lng, String timestamp, String status) {
        Order.Location location = new Order.Location();
        location.setLat(lat);
        location.setLng(lng);
        location.setTimestamp(timestamp);
        return location;
    }

    // Method to fetch order by ID
    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Method to update delivery status periodically (for demonstration, simulate delivery progress update)
    public void updateDeliveryProgress(String orderId) {
        Order order = getOrderById(orderId);
        List<Order.Location> progress = order.getDeliveryProgress();

        // Add new location to simulate delivery progress
        Order.Location newLocation = createLocation(19.025000, 72.855000, "2024-12-26T15:00:00Z", "Out for Delivery");
        progress.add(newLocation);

        // Update the order with the new delivery progress
        order.setDeliveryProgress(progress);
        orderRepository.save(order);
    }
}
