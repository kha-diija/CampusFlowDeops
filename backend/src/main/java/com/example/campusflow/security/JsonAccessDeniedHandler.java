package com.example.campusflow.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class JsonAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(
        HttpServletRequest request,
        HttpServletResponse response,
        AccessDeniedException accessDeniedException
    ) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String payload = String.format(
            "{\"status\":%d,\"message\":\"%s\",\"timestamp\":\"%s\"}",
            HttpStatus.FORBIDDEN.value(),
            "Vous n'avez pas l'autorisation d'accéder à cette ressource.".replace("\"", "\\\""),
            LocalDateTime.now()
        );

        response.getWriter().write(payload);
    }
}
