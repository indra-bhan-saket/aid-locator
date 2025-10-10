package com.aidlocator.backend.listing;

import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import com.aidlocator.backend.auth.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name = "ProviderListing")
@Entity
public class ProviderListing {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;
	
	@ManyToOne
    @JoinColumn(name = "provider_id", referencedColumnName = "id")
	@JsonIgnore
    private User user;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private Boolean active;
    
    @Column
    private String servicesOffered;
    
    @Column
    private BigDecimal gpsLat;
    
    
    @Column
    private BigDecimal gpsLng;
    
    
    @Column
    private String status;
    
    @Column
    private Boolean pin;
    
	@Column
    private String capacity;
    

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;
    
    
    @Column(name = "deleted_at")
    private Date deletedAt;
    

	public Integer getId() {
		return id;
	}

    
    
    public User getUser() {
		return user;
	}



	public void setUser(User user) {
		this.user = user;
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



	public Boolean getActive() {
		return active;
	}



	public void setActive(Boolean active) {
		this.active = active;
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



	public Date getDeletedAt() {
		return deletedAt;
	}



	public void setDeletedAt(Date deletedAt) {
		this.deletedAt = deletedAt;
	}



 

}
