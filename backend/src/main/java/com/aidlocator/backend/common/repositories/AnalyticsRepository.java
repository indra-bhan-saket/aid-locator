package com.aidlocator.backend.common.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.aidlocator.backend.common.entities.Analytics;

@Repository
public interface AnalyticsRepository extends CrudRepository<Analytics, Integer> {
}
