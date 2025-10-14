package com.aidlocator.backend.controller;

import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.dtos.LoginUserDto;
import com.aidlocator.backend.auth.dtos.RegisterUserDto;
import com.aidlocator.backend.auth.responses.LoginResponse;
import com.aidlocator.backend.auth.services.AuthenticationService;
import com.aidlocator.backend.auth.services.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.register(registerUserDto);
        if(registeredUser == null) {
        	return new ResponseEntity<>("{\"error\": \"User already exists\"}", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
		if (authenticatedUser != null) {
			String jwtToken = jwtService.generateToken(authenticatedUser);

			LoginResponse loginResponse = new LoginResponse().setToken(jwtToken)
					.setExpiresIn(jwtService.getExpirationTime());

			loginResponse.setUser(authenticatedUser);
			return ResponseEntity.ok(loginResponse);
		}
		
		else {
			return new ResponseEntity<LoginResponse>(HttpStatus.UNAUTHORIZED);
		}

    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
    	return ResponseEntity.ok("Success");
    }
}