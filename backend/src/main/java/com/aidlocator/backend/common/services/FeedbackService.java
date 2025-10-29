package com.aidlocator.backend.common.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.aidlocator.backend.common.dto.FeedbackDto;
import com.aidlocator.backend.common.dto.ListingFeedbackRes;
import com.aidlocator.backend.common.entities.ListingFeedback;
import com.aidlocator.backend.common.repositories.FeedbackRepository;
import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.repositories.ListingRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class FeedbackService {

	private final FeedbackRepository feedbackRepository;
	private final ListingRepository listingRepository;

	@PersistenceContext
	private EntityManager entityManager;

	public FeedbackService(FeedbackRepository feedbackRepository, ListingRepository listingRepository) {
		this.feedbackRepository = feedbackRepository;
		this.listingRepository = listingRepository;
	}

	public ListingFeedback storeListingFeedback(FeedbackDto feedbackDto) {
		ProviderListing providerListing = listingRepository.findById(feedbackDto.getListingId()).orElse(null);
		if (providerListing != null) {
			ListingFeedback listingFeedback = new ListingFeedback();
			if (feedbackDto.getId() != null) {
				listingFeedback.setId(feedbackDto.getId().longValue());
			}
			listingFeedback.setProviderListing(providerListing);
			listingFeedback.setFeedback(feedbackDto.getFeedback());
			return feedbackRepository.save(listingFeedback);
		}
		return null;
	}

	public List<ListingFeedback> getAllListingFeedbacks() {
		return (List<ListingFeedback>) feedbackRepository.findAll();
	}

	public List<ListingFeedbackRes> getAllListingFeedbacksRes() {
		List<ListingFeedback> feedbacks = (List<ListingFeedback>) feedbackRepository.findAll();
		return feedbacks.stream().map(this::convertToRes).collect(Collectors.toList());
	}

	private ListingFeedbackRes convertToRes(ListingFeedback feedback) {
		ListingFeedbackRes res = new ListingFeedbackRes();
		res.setId(feedback.getId());
		res.setFeedback(feedback.getFeedback());
		res.setCreatedAt(feedback.getCreatedAt());
		res.setUpdatedAt(feedback.getUpdatedAt());
		
		if (feedback.getProviderListing() != null) {
			res.setListingId(feedback.getProviderListing().getId().longValue());
			res.setListingName(feedback.getProviderListing().getName());
		}
		
		return res;
	}
	
	public Boolean deleteComment(Integer id) {
		ListingFeedback listingFeedback = feedbackRepository.findById(id).orElse(null);
		if (listingFeedback != null) {
			feedbackRepository.deleteById(id);
			return true;
		}
		return false;
	}
}
