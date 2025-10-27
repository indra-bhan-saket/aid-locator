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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.auth.dtos.RegisterUserDto;
import com.aidlocator.backend.auth.dtos.UserApproval;
import com.aidlocator.backend.auth.dtos.UserResponse;
import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.services.UserService;
import com.aidlocator.backend.common.services.FeedbackService;
import com.aidlocator.backend.constants.AidConstants;
import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.dto.ListingReq;
import com.aidlocator.backend.listing.dto.ListingApproval;
import com.aidlocator.backend.listing.dto.ListingRes;
import com.aidlocator.backend.listing.services.ListingService;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/api/private")
@RestController
public class AidManageController {
	private final ListingService listingService;
	private final FeedbackService feedbackService;
	
	@Autowired
	private UserService userService;
	
	public AidManageController(ListingService listingService, FeedbackService feedbackService) {
		this.listingService = listingService;
		this.feedbackService = feedbackService;
	}

	@PostMapping("/listing")
	public ResponseEntity<ListingRes> storeListing(@RequestBody ListingReq listing, HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
		ProviderListing providerListing = listingService.storeListing(listing,email);
		if(providerListing == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok(new ListingRes(providerListing));
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
    public ResponseEntity<List<ListingRes>> userAllListings(HttpServletRequest request) {
		String email = (String) request.getAttribute("userEmail");
		List<ProviderListing> providerListings = listingService.allListingForUser(email);
		if(providerListings == null) {
			return ResponseEntity.ok(List.of());
		}
		List<ListingRes> listingDTOs = providerListings.stream()
			.map(ListingRes::new)
			.collect(Collectors.toList());
        return ResponseEntity.ok(listingDTOs);
	}
	
	@GetMapping("/listingsReview")
   public ResponseEntity<List<ListingRes>> getAllListings(@RequestParam(name = "tags", required = false) String tags, HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if (AidConstants.ADMIN.equalsIgnoreCase(role)) {
			List<ProviderListing> providerListings = null;
			if (tags == null || tags.isEmpty()) {
				providerListings = listingService.getAllListings();
			} else {
				providerListings = listingService.findByTags(tags, false);
			}
			List<ListingRes> listingDTOs = providerListings.stream().map(ListingRes::new).collect(Collectors.toList());
			return ResponseEntity.ok(listingDTOs);
		}
		else {
			return new ResponseEntity<List<ListingRes>>(HttpStatus.UNAUTHORIZED);
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
	
	@DeleteMapping("/feedback/{id}")
	public ResponseEntity<String> deleteComment(@PathVariable("id") Integer id, HttpServletRequest request) {
		String role = (String) request.getAttribute("role");
		if (AidConstants.ADMIN.equalsIgnoreCase(role)) {
			Boolean deleted = feedbackService.deleteComment(id);
			if (deleted) {
				return new ResponseEntity<String>("Comment delete successfully", HttpStatus.OK);
			}
			return new ResponseEntity<String>("Comment not found", HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<String>("Comment deletion is unauthorized", HttpStatus.UNAUTHORIZED);
		}
	}
	
}
