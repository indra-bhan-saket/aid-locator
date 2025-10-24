package com.aidlocator.backend.common.dto;

public class FeedbackDto {

	private Integer id;

	private Integer listingId;

	private String feedback;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getListingId() {
		return listingId;
	}

	public void setListingId(Integer listingId) {
		this.listingId = listingId;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	@Override
	public String toString() {
		return "FeedbackDto [id=" + id + ", listingId=" + listingId + ", feedback=" + feedback + "]";
	}

}
