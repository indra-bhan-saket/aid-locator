package com.aidlocator.backend.listing.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aidlocator.backend.auth.entities.User;
import com.aidlocator.backend.auth.services.UserService;
import com.aidlocator.backend.constants.AidConstants;
import com.aidlocator.backend.listing.ProviderListing;
import com.aidlocator.backend.listing.dto.Listing;
import com.aidlocator.backend.listing.dto.ListingApproval;
import com.aidlocator.backend.listing.repositories.ListingRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Service
public class ListingService {
    private final ListingRepository listingRepository;
    
    @Autowired
    private UserService userService;
    
    @PersistenceContext
    private EntityManager entityManager;
    

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }
    
    
    public ProviderListing storeListing(Listing listing, String email) {
    	User user = userService.getUserByEmail(email);
    	if(user != null) {
    		ProviderListing providerListing = new ProviderListing();
    		providerListing.setId(listing.getId());
    		providerListing.setUser(user);
    		providerListing.setActive(listing.isActive());
    		providerListing.setCapacity(listing.getCapacity());
    		providerListing.setGpsLat(listing.getGpsLat());
    		providerListing.setGpsLat(listing.getGpsLng());
    		providerListing.setServicesOffered(listing.getServicesOffered());
    		providerListing.setName(listing.getName());
    		providerListing.setDescription(listing.getDescription());
    		providerListing.setPin(listing.getPin());
    		providerListing.setStatus(AidConstants.PENDING);
    		return listingRepository.save(providerListing);
    	}
		return null;
    }
    
    @Transactional
	public int approveListing(ListingApproval listingApproval) {
		ProviderListing providerListing = new ProviderListing();
		providerListing.setId(listingApproval.getId());
		providerListing.setStatus(listingApproval.getStatus());
		return listingRepository.setStatusForProviderListing(listingApproval.getStatus(),listingApproval.getId());
	}
	
	public List<ProviderListing> allListingForUser(String email) {
		User user = userService.getUserByEmail(email);
		if (user != null) {
			return listingRepository.findByUser(user);
		}
		return null;

	}
	
	public List<ProviderListing> getApprovedListings() {
			return listingRepository.findByStatus(AidConstants.APPROVED);
	}
	
	public List<ProviderListing> getAllListings() {
	 return (List<ProviderListing>) listingRepository.findAll();

	}
	
	public List<ProviderListing> findByTags(String tagSearch, String status) {
		List<String> tags = Arrays.asList(tagSearch.split(","));
        StringBuilder sql = new StringBuilder("SELECT * FROM Provider_Listing where services_offered like CONCAT('%',");
        for (int i = 0; i < tags.size(); i++) {
        	sql.append(":tag").append(i).append(",'%')");
            if (i < tags.size() - 1) {
                sql.append(" OR services_offered like CONCAT('%',");
            }
        }
        sql.append(" AND status=:status");
        Query query = entityManager.createNativeQuery(sql.toString(), ProviderListing.class);
        for (int i = 0; i < tags.size(); i++) {
            query.setParameter("tag" + i, tags.get(i));
        }
        query.setParameter("status", status);
        return query.getResultList();
    }

}
