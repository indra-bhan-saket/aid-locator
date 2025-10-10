package com.aidlocator.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:7200")
public class AidLocatorController {

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Aid Locator Backend");
        response.put("version", "1.0.0");
        return response;
    }

    @GetMapping("/info")
    public Map<String, String> info() {
        Map<String, String> response = new HashMap<>();
        response.put("application", "Aid Locator");
        response.put("description", "A service to locate aid resources");
        return response;
    }
}
