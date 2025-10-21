package com.aidlocator.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.auth.dtos.RegisterUserDto;
import com.aidlocator.backend.auth.dtos.UserApproval;
import com.aidlocator.backend.auth.dtos.UserResponse;
import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.services.UserService;
import com.aidlocator.backend.constants.AidConstants;
import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.dto.Listing;
import com.aidlocator.backend.listing.dto.ListingApproval;
import com.aidlocator.backend.listing.dto.ListingDTO;
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
	
	@PutMapping("/listing")
	public ResponseEntity<ProviderListing> updateListing(@RequestBody Listing listing, HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
		ProviderListing providerListing = listingService.updateListing(listing,email);
		if (providerListing != null) {
			return ResponseEntity.ok(providerListing);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/listing/{id}")
	public ResponseEntity<Void> deleteListing(@PathVariable("id") Integer id, HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
		boolean deleted = listingService.deleteListing(id, email);
		if (deleted) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/listingsByUser")
    public ResponseEntity<List<ProviderListing>> userAllListings(HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
    	List<ProviderListing> providerListings = listingService.allListingForUser(email);
        return ResponseEntity.ok(providerListings);
	}
	
	@GetMapping("/listingsReview")
    public ResponseEntity<List<ListingDTO>> getAllListings(HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if(AidConstants.ADMIN.equalsIgnoreCase(role)) {
			List<ProviderListing> providerListings = listingService.getAllListings();
			List<ListingDTO> listingDTOs = providerListings.stream()
				.map(ListingDTO::new)
				.collect(Collectors.toList());
			return ResponseEntity.ok(listingDTOs);
		}
		else {
			return new ResponseEntity<List<ListingDTO>>(HttpStatus.UNAUTHORIZED);
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
    public ResponseEntity<List<UserResponse>> getAllUsers(HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if(AidConstants.ADMIN.equalsIgnoreCase(role)) {
			List<User> users = userService.allUsers();
			List<UserResponse> userResponses = users.stream()
				.map(UserResponse::new)
				.collect(Collectors.toList());
			return ResponseEntity.ok(userResponses);
		}
		else {
			return new ResponseEntity<List<UserResponse>>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	@GetMapping("/userByEmail")
	public ResponseEntity<User> getUserByEmail(HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
		User user = userService.getUserByEmail(email);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@PostMapping("/updateUserProfile")
	public ResponseEntity<String> updateUserProfile(@RequestHeader("Authorization") String authHeader,
			@RequestBody RegisterUserDto registerUserDto) {
		String requestToken = authHeader.replace("Bearer ", "");
		if (requestToken == null || requestToken.isBlank()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		Integer updatedRecord = userService.updateUserProfile(registerUserDto);
		if (updatedRecord >= 1) {
			return new ResponseEntity<String>("User profile updated successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Profile update failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
}
