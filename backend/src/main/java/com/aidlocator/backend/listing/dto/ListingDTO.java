package com.aidlocator.backend.listing.dto;

import java.util.Date;
import com.aidlocator.backend.listing.ProviderListing;

public class ListingDTO {
	
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
	
	public ListingDTO() {
	}
	
	public ListingDTO(ProviderListing listing) {
		this.id = listing.getId();
		this.name = listing.getName();
		this.description = listing.getDescription();
		this.servicesOffered = listing.getServicesOffered();
		this.status = listing.getStatus();
		this.capacity = listing.getCapacity();
		this.createdAt = listing.getCreatedAt();
		
		// Convert GPS coordinates to strings
		if (listing.getGpsLat() != null) {
			this.gpsLat = listing.getGpsLat().toString();
		}
		if (listing.getGpsLng() != null) {
			this.gpsLng = listing.getGpsLng().toString();
		}
		
		// Create a formatted address from GPS coordinates if available
		if (listing.getGpsLat() != null && listing.getGpsLng() != null) {
			this.address = "Lat: " + listing.getGpsLat() + ", Lng: " + listing.getGpsLng();
		} else {
			this.address = "Address not available";
		}
		
		// Set provider name from user entity
		if (listing.getUser() != null) {
			this.provider = listing.getUser().getName();
		}
		
		// Set verification status based on pin field
		this.verificationStatus = (listing.getPin() != null && listing.getPin()) ? "Verified" : "Pending";
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

	@Override
	public String toString() {
		return "ListingDTO [id=" + id + ", name=" + name + ", provider=" + provider + ", status=" + status + "]";
	}
}
