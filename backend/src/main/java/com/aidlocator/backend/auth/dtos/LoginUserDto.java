package com.aidlocator.backend.auth.dtos;

public class LoginUserDto {
    private String email;
    private String password;
    private String newPassword;

    public String getEmail() {
        return email;
    }

    public LoginUserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public LoginUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

   	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	@Override
	public String toString() {
		return "LoginUserDto [email=" + email + ", password=" + password + ", newPassword=" + newPassword + "]";
	}
	
	
}
