package com.aidlocator.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.auth.dtos.UserApproval;
import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.services.UserService;
import com.aidlocator.backend.constants.AidConstants;
import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.dto.Listing;
import com.aidlocator.backend.listing.dto.ListingApproval;
import com.aidlocator.backend.listing.services.ListingService;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/api/private")
@RestController
public class AidManageController {
	private final ListingService listingService;
	
	@Autowired
	private UserService userService;
	
	public AidManageController(ListingService listingService) {
		this.listingService = listingService;
	}

	@PostMapping("/listing")
	public ResponseEntity<ProviderListing> storeListing(@RequestBody Listing listing, HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
		ProviderListing providerListing = listingService.storeListing(listing,email);
		return ResponseEntity.ok(providerListing);
	}
	
	@GetMapping("/listingsByUser")
    public ResponseEntity<List<ProviderListing>> userAllListings(HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
    	List<ProviderListing> providerListings = listingService.allListingForUser(email);
        return ResponseEntity.ok(providerListings);
	}
	
	@GetMapping("/listingsReview")
    public ResponseEntity<List<ProviderListing>> getAllListings(HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if(AidConstants.ADMIN.equalsIgnoreCase(role)) {
			List<ProviderListing> providerListings = listingService.getAllListings();
			return ResponseEntity.ok(providerListings);
		}
		else {
			return new ResponseEntity<List<ProviderListing>>(HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/listingApprove")
	public ResponseEntity<Integer> approveListing(@RequestBody ListingApproval listingApproval, HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if(AidConstants.ADMIN.equalsIgnoreCase(role)) {
		int providerListing = listingService.approveListing(listingApproval);
		return ResponseEntity.ok(providerListing);
		}
		return new ResponseEntity<Integer>(HttpStatus.UNAUTHORIZED);
	}
	
	@PostMapping("/userApprove")
	public ResponseEntity<Integer> approveUser(@RequestBody UserApproval userApproval, HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if(AidConstants.ADMIN.equalsIgnoreCase(role)) {
		int value = userService.approveUser(userApproval);
		return ResponseEntity.ok(value);
		}
		return new ResponseEntity<Integer>(HttpStatus.UNAUTHORIZED);
	}
	
	@GetMapping("/userReview")
    public ResponseEntity<List<User>> getAllUsers(HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if(AidConstants.ADMIN.equalsIgnoreCase(role)) {
			List<User> users = userService.allUsers();
			return ResponseEntity.ok(users);
		}
		else {
			return new ResponseEntity<List<User>>(HttpStatus.UNAUTHORIZED);
		}
	}
	
}
