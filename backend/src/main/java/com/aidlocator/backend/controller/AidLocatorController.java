package com.aidlocator.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.dto.ListingRes;
import com.aidlocator.backend.listing.services.ListingService;

@RequestMapping("/api/public")
@RestController
public class AidLocatorController {
	
    private final ListingService listingService;

    public AidLocatorController(ListingService listingService) {
        this.listingService = listingService;
    }

       
    @GetMapping("/listings")
    public ResponseEntity<List<ListingRes>> getAllListings() {
    	List<ProviderListing> providerListings = listingService.getVerifiedListings();
    	List<ListingRes> listingResponses = providerListings.stream()
    		.map(ListingRes::new)
    		.collect(Collectors.toList());
        return ResponseEntity.ok(listingResponses);
    }
    
    @GetMapping("/listingsByTags")
    public ResponseEntity<List<ListingRes>> getAllListingsByCriteria(@RequestParam(name = "tags", required = false) String tags) {
    	List<ProviderListing> providerListings = listingService.findByTags(tags, true);
    	List<ListingRes> listingResponses = providerListings.stream()
    		.map(ListingRes::new)
    		.collect(Collectors.toList());
        return ResponseEntity.ok(listingResponses);
    }
}
