package com.aidlocator.backend.common.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aidlocator.backend.common.dto.FeedbackDto;
import com.aidlocator.backend.common.entities.ListingFeedback;
import com.aidlocator.backend.common.repositories.FeedbackRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class FeedbackService {

	private final FeedbackRepository feedbackRepository;

	@PersistenceContext
	private EntityManager entityManager;

	public FeedbackService(FeedbackRepository feedbackRepository) {
		this.feedbackRepository = feedbackRepository;
	}

	public ListingFeedback storeListingFeedback(FeedbackDto feedbackDto) {
		// User user = userService.getUserByEmail(listing.getEmail());
		ListingFeedback listingFeedback = new ListingFeedback();
		listingFeedback.setId(feedbackDto.getId());
		listingFeedback.setListingId(feedbackDto.getListingId());
		listingFeedback.setServiceType(feedbackDto.getServiceType());
		listingFeedback.setVisitorPhone(feedbackDto.getVisitorPhone());
		listingFeedback.setVisitorName(feedbackDto.getVisitorName());
		listingFeedback.setFeedback(feedbackDto.getFeedback());
		listingFeedback.setInactive(feedbackDto.getInactive());
		return feedbackRepository.save(listingFeedback);
	}

	public List<ListingFeedback> getAllListingFeedbacks() {
		return (List<ListingFeedback>) feedbackRepository.findAll();
	}

}
