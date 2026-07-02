package com.nasia.smarthire.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret", "smarthire_super_secret_key_2026_coding_factory");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86400000L);
    }

    @Test
    void generateToken_ShouldReturnNonNullToken() {
        String token = jwtUtil.generateToken("nasia@smarthire.com");
        assertNotNull(token);
    }

    @Test
    void extractUsername_ShouldReturnCorrectEmail() {
        String email = "nasia@smarthire.com";
        String token = jwtUtil.generateToken(email);
        String extracted = jwtUtil.extractUsername(token);
        assertEquals(email, extracted);
    }

    @Test
    void isTokenValid_ShouldReturnTrueForValidToken() {
        String token = jwtUtil.generateToken("nasia@smarthire.com");
        assertTrue(jwtUtil.isTokenValid(token));
    }

    @Test
    void isTokenValid_ShouldReturnFalseForInvalidToken() {
        assertFalse(jwtUtil.isTokenValid("invalid.token.here"));
    }
}