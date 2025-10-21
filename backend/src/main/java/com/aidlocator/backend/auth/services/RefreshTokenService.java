package com.aidlocator.backend.auth.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.aidlocator.backend.auth.entities.RefreshToken;
import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.repositories.RefreshTokenRepository;

@Service
public class RefreshTokenService {
	private final RefreshTokenRepository refreshTokenRepository;

	public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
		this.refreshTokenRepository = refreshTokenRepository;
	}

	public RefreshToken createRefreshToken(String jwtToken, long expirationTime, User user) {
		Optional<RefreshToken> userToken = refreshTokenRepository.findByUser(user);
		RefreshToken refreshToken = new RefreshToken();
		if (userToken != null && !userToken.isEmpty()) {
			refreshToken.setId(userToken.get().getId());
		}
		refreshToken.setUser(user);
		refreshToken.setToken(jwtToken);
		refreshToken.setExpirationTime(expirationTime);
		return refreshTokenRepository.save(refreshToken);
	}

	public Optional<RefreshToken> findByToken(String token) {
		return refreshTokenRepository.findByToken(token);
	}
	
	public void deleteRefreshTokenByUser(User user) {
		refreshTokenRepository.deleteByUser(user);
	}
	
	public void deleteRefreshToken(RefreshToken refreshToken) {
		refreshTokenRepository.delete(refreshToken);
	}

}
