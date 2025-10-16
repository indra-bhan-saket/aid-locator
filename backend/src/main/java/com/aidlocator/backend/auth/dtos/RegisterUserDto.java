package com.aidlocator.backend.auth.dtos;

public class RegisterUserDto {
    private String email;
    private String phone;
    private String password;
    private String role;
    private String name;
    private String type;
    

    public String getEmail() {
        return email;
    }

    public RegisterUserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public RegisterUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public RegisterUserDto setName(String name) {
		this.name = name;
		return this;
	}

	@Override
	public String toString() {
		return super.toString();
	}

	public String getType() {
		return type;
	}

	public RegisterUserDto setType(String type) {
		this.type = type;
		return this;
	}

    
}
