package com.aidlocator.backend.listing.dto;

import java.math.BigDecimal;


public class Listing {
	
    private String name;

    private String description;

    private String servicesOffered;
    
    private BigDecimal gpsLat;
    
    private BigDecimal gpsLng;
    
    private String status;
    
    private Boolean pin;

    private String email;
    
    private String capacity;
    
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

	public String getServicesOffered() {
		return servicesOffered;
	}

	public void setServicesOffered(String servicesOffered) {
		this.servicesOffered = servicesOffered;
	}

	public BigDecimal getGpsLat() {
		return gpsLat;
	}

	public void setGpsLat(BigDecimal gpsLat) {
		this.gpsLat = gpsLat;
	}

	public BigDecimal getGpsLng() {
		return gpsLng;
	}

	public void setGpsLng(BigDecimal gpsLng) {
		this.gpsLng = gpsLng;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Boolean getPin() {
		return pin;
	}

	public void setPin(Boolean pin) {
		this.pin = pin;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

	@Override
	public String toString() {
		return "Listing [name=" + name + ", description=" + description + ", servicesOffered=" + servicesOffered
				+ ", gpsLat=" + gpsLat + ", gpsLng=" + gpsLng + ", status=" + status + ", pin=" + pin + ", email="
				+ email + ", capacity=" + capacity + "]";
	}
 
}
