package com.aidlocator.backend.listing.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.listing.ProviderListing;

@Repository
public interface ListingRepository extends CrudRepository<ProviderListing, Integer> {
    List<ProviderListing> findByUser(User user);
    List<ProviderListing> findByStatus(String status);
    List<ProviderListing> findByVerificationStatus(String verificationStatus);
    @Modifying
    @Query("update ProviderListing pl set pl.verificationStatus = ?1 where pl.id = ?2")
    int setVerificationStatusForProviderListing(String verificationStatus, Integer id);
}
