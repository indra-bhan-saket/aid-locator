package com.aidlocator.backend.listing.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.listing.ProviderListing;

@Repository
public interface ListingRepository extends CrudRepository<ProviderListing, Integer> {
    List<ProviderListing> findByUser(User user);
}
