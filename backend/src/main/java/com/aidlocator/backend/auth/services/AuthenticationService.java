package com.aidlocator.backend.auth.services;

import com.aidlocator.backend.auth.dtos.LoginUserDto;
import com.aidlocator.backend.auth.dtos.RegisterUserDto;
import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterUserDto input) {
    	if(!isUserExist(input)) {
        var user = new User()
            .setPhone(input.getPhone())
            .setEmail(input.getEmail())
            .setRole(input.getRole())
            .setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    	}
    	
    	return null;
    }

	private boolean isUserExist(RegisterUserDto input) {
		Optional<User> opt = userRepository.findByEmail(input.getEmail());
		return opt.isPresent();
	}

	public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}
