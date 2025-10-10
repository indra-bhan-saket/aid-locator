package com.aidlocator.backend.listing.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.services.UserService;
import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.dto.Listing;
import com.aidlocator.backend.listing.repositories.ListingRepository;

@Service
public class ListingService {
    private final ListingRepository listingRepository;
    
    @Autowired
    private UserService userService;
    

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }
    
    
    public ProviderListing storeListing(Listing listing) {
    	User user = userService.getUserByEmail(listing.getEmail());
    	if(user != null) {
    		ProviderListing providerListing = new ProviderListing();
    		providerListing.setUser(user);
    		providerListing.setActive(true);
    		providerListing.setCapacity(listing.getCapacity());
    		providerListing.setGpsLat(listing.getGpsLat());
    		providerListing.setGpsLat(listing.getGpsLng());
    		providerListing.setServicesOffered(listing.getServicesOffered());
    		providerListing.setName(listing.getName());
    		providerListing.setDescription(listing.getDescription());
    		providerListing.setPin(listing.getPin());
    		return listingRepository.save(providerListing);
    	}
		return null;
    }
    
	
	public List<ProviderListing> allListingForUser(String email) {
		User user = userService.getUserByEmail(email);
		if (user != null) {
			return listingRepository.findByUser(user);
		}
		return null;

	}
	
	public List<ProviderListing> getAllListings() {
	 return (List<ProviderListing>) listingRepository.findAll();

	}

}
