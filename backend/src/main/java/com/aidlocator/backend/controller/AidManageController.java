package com.aidlocator.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.dto.Listing;
import com.aidlocator.backend.listing.services.ListingService;

@RequestMapping("/api/private")
@RestController
public class AidManageController {
	private final ListingService listingService;

	public AidManageController(ListingService listingService) {
		this.listingService = listingService;
	}

	@PostMapping("/listing")
	public ResponseEntity<ProviderListing> storeListing(@RequestBody Listing listing) {
		ProviderListing providerListing = listingService.storeListing(listing);
		return ResponseEntity.ok(providerListing);
	}
}
