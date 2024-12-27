package com.Santa.Logistics.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Helpers {

    @GetMapping("/helper")
    public String helper(){
        return "Ok";
    }
}
