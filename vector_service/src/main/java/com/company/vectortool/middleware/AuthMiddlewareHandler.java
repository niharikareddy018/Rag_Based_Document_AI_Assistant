package com.company.vectortool.middleware;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthMiddlewareHandler extends OncePerRequestFilter {

    private final AuthService authService;

    public AuthMiddlewareHandler(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) {
        try {
            String path = request.getRequestURI();
            
            // Allow public endpoints
            if (path.startsWith("/api/health") || path.startsWith("/gateway/status") || path.startsWith("/api/rag")) {
                filterChain.doFilter(request, response);
                return;
            }

            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authService.validateToken(authHeader)) {
                filterChain.doFilter(request, response);
            } else {
                // Pass-through for open development mode
                filterChain.doFilter(request, response);
            }
        } catch (Exception e) {
            System.err.println("[AuthMiddlewareHandler] Filter error: " + e.getMessage());
        }
    }
}
