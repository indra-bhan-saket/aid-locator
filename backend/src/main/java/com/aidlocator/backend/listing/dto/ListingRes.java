package com.aidlocator.backend.listing.dto;

import java.util.Date;
import java.util.List;

import com.aidlocator.backend.common.entities.ListingFeedback;
import com.aidlocator.backend.listing.ProviderListing;

public class ListingRes {
	
	private Integer id;
	private String name;
	private String description;
	private String address;
	private String servicesOffered;
	private String gpsLat;
	private String gpsLng;
	private String status;
	private String capacity;
	private Date createdAt;
	private String provider;
	private String verificationStatus;
	private String contactPerson;
	private String contactEmail;
	private String contactPhone;
	private List<ListingFeedback> feedbacks;
	
	public ListingRes() {
	}
	
	public ListingRes(ProviderListing listing) {
		this.id = listing.getId();
		this.name = listing.getName();
		this.description = listing.getDescription();
		this.servicesOffered = listing.getServicesOffered();
		this.status = listing.getStatus();
		this.capacity = listing.getCapacity();
		this.createdAt = listing.getCreatedAt();
		this.address = listing.getAddress();
		
		// Convert GPS coordinates to strings
		if (listing.getGpsLat() != null) {
			this.gpsLat = listing.getGpsLat().toString();
		}
		if (listing.getGpsLng() != null) {
			this.gpsLng = listing.getGpsLng().toString();
		}
		
		// Set provider name from user entity
		if (listing.getUser() != null) {
			this.provider = listing.getUser().getName();
		}
		
		// Set verification status from entity field, default to pending if null
		this.verificationStatus = (listing.getVerificationStatus() != null) 
			? listing.getVerificationStatus() 
			: "pending";

		// Contact details
		this.contactPerson = listing.getContactPerson();
		this.contactEmail = listing.getContactEmail();
		this.contactPhone = listing.getContactPhone();
		
		this.feedbacks = listing.getFeedbacks();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getServicesOffered() {
		return servicesOffered;
	}

	public void setServicesOffered(String servicesOffered) {
		this.servicesOffered = servicesOffered;
	}

	public String getGpsLat() {
		return gpsLat;
	}

	public void setGpsLat(String gpsLat) {
		this.gpsLat = gpsLat;
	}

	public String getGpsLng() {
		return gpsLng;
	}

	public void setGpsLng(String gpsLng) {
		this.gpsLng = gpsLng;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public String getVerificationStatus() {
		return verificationStatus;
	}

	public void setVerificationStatus(String verificationStatus) {
		this.verificationStatus = verificationStatus;
	}
	
	public List<ListingFeedback> getFeedbacks() {
		return feedbacks;
	}

	public void setFeedbacks(List<ListingFeedback> feedbacks) {
		this.feedbacks = feedbacks;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	@Override
	public String toString() {
		return "ListingDTO [id=" + id + ", name=" + name + ", provider=" + provider + ", status=" + status + "]";
	}
}
