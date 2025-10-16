package com.aidlocator.backend.listing.dto;

public class ListingApproval {
	
	private Integer id;
	
    private String status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ListingApproval [id=" + id + ", status=" + status + "]";
	}
    
	
 
}
