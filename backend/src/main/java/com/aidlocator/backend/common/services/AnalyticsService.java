package com.aidlocator.backend.common.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aidlocator.backend.auth.services.UserService;
import com.aidlocator.backend.common.dto.AnalyticsDto;
import com.aidlocator.backend.common.entities.Analytics;
import com.aidlocator.backend.common.repositories.AnalyticsRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class AnalyticsService {

	private final AnalyticsRepository analyticsRepository;

	@Autowired
	private UserService userService;

	@PersistenceContext
	private EntityManager entityManager;

	public AnalyticsService(AnalyticsRepository analyticsRepository) {
		this.analyticsRepository = analyticsRepository;
	}

	public Analytics stoteAnalytics(AnalyticsDto analyticsDto) {
		// User user = userService.getUserByEmail(analyticsDto.getUserId());
		Analytics analytics = new Analytics();
		analytics.setId(analyticsDto.getId());
		analytics.setUserId(analyticsDto.getUserId());
		analytics.setSessionId(analyticsDto.getSessionId());
		analytics.setPageVisited(analyticsDto.getPageVisited());
		analytics.setActionType(analyticsDto.getActionType());
		analytics.setDeviceType(analyticsDto.getDeviceType());
		analytics.setBrowserInfo(analyticsDto.getBrowserInfo());
		analytics.setIpAddress(analyticsDto.getIpAddress());
		analytics.setGpsLat(analyticsDto.getGpsLat());
		analytics.setGpsLng(analyticsDto.getGpsLong());
		return analyticsRepository.save(analytics);
	}

	public List<Analytics> getAllListings() {
		return (List<Analytics>) analyticsRepository.findAll();
	}

}
