package com.aidlocator.backend.auth.configs;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class TokenTableRunner implements CommandLineRunner {

	private final JdbcTemplate jdbcTemplate;

	public TokenTableRunner(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public void run(String... args) throws Exception {
		jdbcTemplate.execute("TRUNCATE TABLE REFRESH_TOKEN");
	}
}
