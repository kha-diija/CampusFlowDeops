package com.example.campusflow.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JsonAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException authException
    ) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String payload = String.format(
            "{\"status\":%d,\"message\":\"%s\",\"timestamp\":\"%s\"}",
            HttpStatus.UNAUTHORIZED.value(),
            "E-mail ou mot de passe incorrect".replace("\"", "\\\""),
            LocalDateTime.now()
        );

        response.getWriter().write(payload);
    }
}
