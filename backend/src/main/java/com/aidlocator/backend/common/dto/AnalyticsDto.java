package com.aidlocator.backend.common.dto;

import java.math.BigDecimal;

public class AnalyticsDto {

	private Integer id;

	private Integer userId;

	private String sessionId;

	private String pageVisited;

	private String actionType;

	private String deviceType;

	private String browserInfo;

	private String ipAddress;

	private BigDecimal gpsLat;

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

	public BigDecimal getGpsLong() {
		return gpsLong;
	}

	public void setGpsLong(BigDecimal gpsLong) {
		this.gpsLong = gpsLong;
	}

	@Override
	public String toString() {
		return "AnalyticsDto [id=" + id + ", userId=" + userId + ", sessionId=" + sessionId + ", pageVisited="
				+ pageVisited + ", actionType=" + actionType + ", deviceType=" + deviceType + ", browserInfo="
				+ browserInfo + ", ipAddress=" + ipAddress + ", gpsLat=" + gpsLat + ", gpsLong=" + gpsLong + "]";
	}

}
