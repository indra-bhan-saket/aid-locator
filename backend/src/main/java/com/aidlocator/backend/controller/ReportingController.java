package com.aidlocator.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.common.dto.AnalyticsDto;
import com.aidlocator.backend.common.dto.FeedbackDto;
import com.aidlocator.backend.common.dto.ListingFeedbackRes;
import com.aidlocator.backend.common.entities.Analytics;
import com.aidlocator.backend.common.entities.ListingFeedback;
import com.aidlocator.backend.common.services.AnalyticsService;
import com.aidlocator.backend.common.services.FeedbackService;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/api/reporting")
@RestController
public class ReportingController {

	private final FeedbackService feedbackService;

	private final AnalyticsService analyticsService;

	public ReportingController(FeedbackService feedbackService, AnalyticsService analyticsService) {
		super();
		this.feedbackService = feedbackService;
		this.analyticsService = analyticsService;
	}

	@PostMapping("/feedback")
	public ResponseEntity<?> addFeedback(@RequestBody FeedbackDto feedbackDto) {
		ListingFeedback listingFeedback = feedbackService.storeListingFeedback(feedbackDto);
		if (listingFeedback != null) {
			return ResponseEntity.ok(listingFeedback);
		}
		return new ResponseEntity<>("Comment addtional failed", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/feedback")
	public ResponseEntity<List<ListingFeedbackRes>> getAllFeedbacks() {
		List<ListingFeedbackRes> listingFeedbacks = feedbackService.getAllListingFeedbacksRes();
		return ResponseEntity.ok(listingFeedbacks);
	}

	@PostMapping("/analytics")
	public ResponseEntity<Analytics> addAnalytics(@RequestBody AnalyticsDto analyticsDto, HttpServletRequest httpServletRequest) {
		analyticsDto.setIpAddress(getIpAddress(httpServletRequest));
		Analytics analytics = analyticsService.stoteAnalytics(analyticsDto);
		return ResponseEntity.ok(analytics);
	}

	@GetMapping("/analytics")
	public ResponseEntity<List<Analytics>> getAllAnalytics() {
		List<Analytics> analytics = analyticsService.getAllListings();
		return ResponseEntity.ok(analytics);
	}
	
	private String getIpAddress(HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getHeader("X-Forwarded-For");
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = httpServletRequest.getRemoteAddr();
		}
		return ipAddress;
	}
}
