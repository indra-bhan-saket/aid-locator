package com.aidlocator.backend.listing.dto;

public class ListingApproval {
	
	private Integer id;
	
    private String verificationStatus;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getVerificationStatus() {
		return verificationStatus;
	}

	public void setVerificationStatus(String verificationStatus) {
		this.verificationStatus = verificationStatus;
	}

	@Override
	public String toString() {
		return "ListingApproval [id=" + id + ", verificationStatus=" + verificationStatus + "]";
	}
    
	
 
}
