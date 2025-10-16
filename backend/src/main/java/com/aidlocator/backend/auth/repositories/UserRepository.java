package com.aidlocator.backend.auth.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.aidlocator.backend.auth.entities.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    @Modifying
    @Query("update User pl set pl.status = ?1 where pl.email = ?2")
    int setStatusForUser(String status, String email);
}
