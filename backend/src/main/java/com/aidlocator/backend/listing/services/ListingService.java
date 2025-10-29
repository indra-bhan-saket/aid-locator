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
import com.aidlocator.backend.listing.dto.ListingApproval;
import com.aidlocator.backend.listing.dto.ListingReq;
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
    
    
    public ProviderListing storeListing(ListingReq listing, String email) {
    	User user = userService.getUserByEmail(email);
    	if(user != null) {
    	ProviderListing providerListing = new ProviderListing();
		if (listing.getId() != null) {
			ProviderListing existingLising = listingRepository.findById(listing.getId()).orElse(null);
			if (existingLising == null || !existingLising.getUser().getId().equals(user.getId())) {
				return null;
			}
		}
    	providerListing.setId(listing.getId());
    	providerListing.setUser(user);
    	providerListing.setActive(listing.isActive());
    	providerListing.setCapacity(listing.getCapacity());
    	providerListing.setGpsLat(listing.getGpsLat());
    	providerListing.setGpsLng(listing.getGpsLng());
    	providerListing.setServicesOffered(listing.getServicesOffered());
    	providerListing.setName(listing.getName());
    	providerListing.setAddress(listing.getAddress());
    	providerListing.setDescription(listing.getDescription());
    	providerListing.setContactPerson(listing.getContactPerson());
    	providerListing.setContactEmail(listing.getContactEmail());
    	providerListing.setContactPhone(listing.getContactPhone());
    	providerListing.setPin(listing.getPin());
    	providerListing.setStatus(listing.getStatus() != null ? listing.getStatus() : AidConstants.PENDING);
    	providerListing.setVerificationStatus(AidConstants.PENDING);
    	return listingRepository.save(providerListing);
    }
	return null;
    }
    
    public boolean deleteListing(Integer id, String email) {
    	User user = userService.getUserByEmail(email);
    	if (user != null) {
    		ProviderListing listing = listingRepository.findById(id).orElse(null);
    		if (listing != null && listing.getUser().getId().equals(user.getId())) {
    			listingRepository.delete(listing);
    			return true;
    		}
    	}
    	return false;
    }
    
    @Transactional
	public int approveListing(ListingApproval listingApproval) {
		return listingRepository.setVerificationStatusForProviderListing(listingApproval.getVerificationStatus(),listingApproval.getId());
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
	
	public List<ProviderListing> getVerifiedListings() {
		return listingRepository.findByVerificationStatus(AidConstants.VERIFIED);
	}
	
	public List<ProviderListing> getAllListings() {
	 return (List<ProviderListing>) listingRepository.findAll();

	}
	
	public List<ProviderListing> findByTags(String tagSearch, boolean isApproved) {
		List<String> tags = Arrays.asList(tagSearch.split(","));
        StringBuilder sql = new StringBuilder("SELECT * FROM Provider_Listing where services_offered like CONCAT('%',");
        for (int i = 0; i < tags.size(); i++) {
        	sql.append(":tag").append(i).append(",'%')");
            if (i < tags.size() - 1) {
                sql.append(" OR services_offered like CONCAT('%',");
            }
        }
		if (isApproved) {
			sql.append(" AND verification_status='approved'");
		}
        Query query = entityManager.createNativeQuery(sql.toString(), ProviderListing.class);
        for (int i = 0; i < tags.size(); i++) {
            query.setParameter("tag" + i, tags.get(i));
        }
        
        return query.getResultList();
    }

}
