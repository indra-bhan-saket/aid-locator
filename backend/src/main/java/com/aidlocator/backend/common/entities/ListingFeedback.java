package com.aidlocator.backend.common.entities;

import java.io.Serializable;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "listing_feedback")
@Entity
public class ListingFeedback implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false)
	private Integer id;

	@Column(name = "listing_id")
	private Integer listingId;

	@Column(name = "service_type")
	private String serviceType;

	@Column(name = "visitor_phone")
	private String visitorPhone;

	@Column(name = "visitor_name")
	private String visitorName;

	@Column(name = "feedback")
	private String feedback;

	@Column(name = "inactive")
	private Boolean inactive;

	@CreationTimestamp
	@Column(updatable = false, name = "created_at")
	private Date createdAt;

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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
}
