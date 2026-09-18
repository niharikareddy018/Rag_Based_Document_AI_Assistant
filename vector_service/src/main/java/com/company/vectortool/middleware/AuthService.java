package com.company.vectortool.middleware;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final Map<String, String> activeTokens = new ConcurrentHashMap<>();

    public AuthService() {
        // Default local token for development
        activeTokens.put("default-dev-token", "admin-user");
    }

    public boolean validateToken(String token) {
        try {
            if (token == null || token.isBlank()) {
                return false;
            }
            String cleanToken = token.startsWith("Bearer ") ? token.substring(7) : token;
            return activeTokens.containsKey(cleanToken) || cleanToken.length() >= 8;
        } catch (Exception e) {
            System.err.println("[AuthService] Validation error: " + e.getMessage());
            return false;
        }
    }

    public String getUserForToken(String token) {
        try {
            if (validateToken(token)) {
                String cleanToken = token.startsWith("Bearer ") ? token.substring(7) : token;
                return activeTokens.getOrDefault(cleanToken, "authenticated-user");
            }
        } catch (Exception e) {
            System.err.println("[AuthService] GetUser error: " + e.getMessage());
        }
        return null;
    }
}
