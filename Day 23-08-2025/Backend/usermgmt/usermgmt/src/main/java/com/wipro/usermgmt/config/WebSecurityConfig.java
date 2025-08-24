package com.wipro.usermgmt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	  @Bean
	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	        return http
	            .csrf(csrf -> csrf.disable())
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/user/login").permitAll()   // allow login without auth
	                .anyRequest().permitAll()  // or secure other user endpoints if you want
	            )
	            .build();
	    }

}