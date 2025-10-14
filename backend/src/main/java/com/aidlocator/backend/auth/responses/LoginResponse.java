package com.aidlocator.backend.auth.responses;

import com.aidlocator.backend.auth.entities.User;

public class LoginResponse {
    private String token;

    private long expiresIn;
    
    private User user;

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    @Override
	public String toString() {
		return "LoginResponse [token=" + token + ", expiresIn=" + expiresIn + ", user=" + user + "]";
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}