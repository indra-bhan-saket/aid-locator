package com.aidlocator.backend.auth.services;

import com.aidlocator.backend.auth.dtos.UserApproval;
import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
    
    public User getUserByEmail(String email) {
    	Optional<User> opt = userRepository.findByEmail(email);
    	return opt.isPresent()?opt.get():null;
    }

    @Transactional
	public int approveUser(UserApproval userApproval) {
		return userRepository.setStatusForUser(userApproval.getStatus(), userApproval.getEmail());
	}
}
