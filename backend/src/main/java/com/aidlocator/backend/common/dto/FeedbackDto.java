package com.aidlocator.backend.common.dto;

public class FeedbackDto {

	private Integer id;

	private Integer listingId;

	private String serviceType;

	private String visitorPhone;

	private String visitorName;

	private String feedback;

	private Boolean inactive;

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

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public String getVisitorPhone() {
		return visitorPhone;
	}

	public void setVisitorPhone(String visitorPhone) {
		this.visitorPhone = visitorPhone;
	}

	public String getVisitorName() {
		return visitorName;
	}

	public void setVisitorName(String visitorName) {
		this.visitorName = visitorName;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public Boolean getInactive() {
		return inactive;
	}

	public void setInactive(Boolean inactive) {
		this.inactive = inactive;
	}

	@Override
	public String toString() {
		return "FeedbackDto [id=" + id + ", listingId=" + listingId + ", serviceType=" + serviceType + ", visitorPhone="
				+ visitorPhone + ", visitorName=" + visitorName + ", feedback=" + feedback + ", inactive=" + inactive
				+ "]";
	}

}
