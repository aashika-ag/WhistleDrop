package com.whistledrop.whistledrop.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        if (!"moderator".equals(username)) {
            throw new UsernameNotFoundException(
                    "Moderator not found"
            );
        }

        return User.builder()
                .username("moderator")
                .password(
                        passwordEncoder.encode("Moderator@123")
                )
                .roles("MODERATOR")
                .build();
    }
}