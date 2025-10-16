package com.aidlocator.backend.auth.dtos;

public class UserApproval {
	
	private String email;
	
    private String status;


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "UserApproval [email=" + email + ", status=" + status + "]";
	}
	
	
 
}
