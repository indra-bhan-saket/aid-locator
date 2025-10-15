package com.aidlocator.backend.common.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "analytics")
@Entity
public class Analytics implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false)
	private Integer id;

	@Column(name = "user_id")
	private Integer userId;

	@CreationTimestamp
	@Column(updatable = false, name = "timestamp")
	private Date timestamp;

	@Column(name = "session_id")
	private String sessionId;

	@Column(name = "page_visited")
	private String pageVisited;

	@Column(name = "action_type")
	private String actionType;

	@Column(name = "device_type")
	private String deviceType;

	@Column(name = "browser_info")
	private String browserInfo;

	@Column(name = "ip_address")
	private String ipAddress;

	@Column(name = "gps_lat")
	private BigDecimal gpsLat;

	@Column(name = "gps_long")
	private BigDecimal gpsLong;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getPageVisited() {
		return pageVisited;
	}

	public void setPageVisited(String pageVisited) {
		this.pageVisited = pageVisited;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getBrowserInfo() {
		return browserInfo;
	}

	public void setBrowserInfo(String browserInfo) {
		this.browserInfo = browserInfo;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public BigDecimal getGpsLat() {
		return gpsLat;
	}

	public void setGpsLat(BigDecimal gpsLat) {
		this.gpsLat = gpsLat;
	}

	public BigDecimal getGpsLng() {
		return gpsLong;
	}

	public void setGpsLng(BigDecimal gpsLong) {
		this.gpsLong = gpsLong;
	}

}
