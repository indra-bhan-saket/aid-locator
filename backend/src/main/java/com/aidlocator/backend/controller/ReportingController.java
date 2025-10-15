package com.aidlocator.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aidlocator.backend.common.dto.AnalyticsDto;
import com.aidlocator.backend.common.dto.FeedbackDto;
import com.aidlocator.backend.common.entities.Analytics;
import com.aidlocator.backend.common.entities.ListingFeedback;
import com.aidlocator.backend.common.services.AnalyticsService;
import com.aidlocator.backend.common.services.FeedbackService;

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
	public ResponseEntity<ListingFeedback> addFeedback(@RequestBody FeedbackDto feedbackDto) {
		ListingFeedback listingFeedback = feedbackService.storeListingFeedback(feedbackDto);
		return ResponseEntity.ok(listingFeedback);
	}

	@GetMapping("/feedback")
	public ResponseEntity<List<ListingFeedback>> getAllFeedbacks() {
		List<ListingFeedback> listingFeedbacks = feedbackService.getAllListingFeedbacks();
		return ResponseEntity.ok(listingFeedbacks);
	}

	@PostMapping("/analytics")
	public ResponseEntity<Analytics> addAnalytics(@RequestBody AnalyticsDto analyticsDto) {
		Analytics analytics = analyticsService.stoteAnalytics(analyticsDto);
		return ResponseEntity.ok(analytics);
	}

	@GetMapping("/analytics")
	public ResponseEntity<List<Analytics>> getAllAnalytics() {
		List<Analytics> analytics = analyticsService.getAllListings();
		return ResponseEntity.ok(analytics);
	}
}
