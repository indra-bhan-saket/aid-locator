package com.aidlocator.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.services.ListingService;

@RequestMapping("/api/public")
@RestController
public class AidLocatorController {
	
    private final ListingService listingService;

    public AidLocatorController(ListingService listingService) {
        this.listingService = listingService;
    }

       
    @GetMapping("/listings")
    public ResponseEntity<List<ProviderListing>> getAllListings() {
    	List<ProviderListing> providerListings = listingService.getApprovedListings();
        return ResponseEntity.ok(providerListings);
    }
    
    @GetMapping("/listingsByTags")
    public ResponseEntity<List<ProviderListing>> getAllListingsByCriteria(@RequestParam("tags") String tags, @RequestParam("status") String status) {
    	List<ProviderListing> providerListings = listingService.findByTags(tags, status);
        return ResponseEntity.ok(providerListings);
    }
}
