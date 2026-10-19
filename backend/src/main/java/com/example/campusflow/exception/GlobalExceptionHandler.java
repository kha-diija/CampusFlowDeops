package com.example.campusflow.exception;

import com.example.campusflow.dto.ErrorResponse;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException exception) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "E-mail ou mot de passe incorrect");
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException exception) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "E-mail ou mot de passe incorrect");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult()
            .getFieldErrors()
            .stream()
            .findFirst()
            .map(FieldError::getDefaultMessage)
            .orElse("Les données envoyées sont invalides.");

        return buildResponse(HttpStatus.BAD_REQUEST, message);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException exception) {
        return buildResponse(HttpStatus.FORBIDDEN, "Vous n'avez pas l'autorisation d'accéder à cette ressource.");
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatus(ResponseStatusException exception) {
        HttpStatus status = HttpStatus.valueOf(exception.getStatusCode().value());
        return buildResponse(status, exception.getReason() == null ? "Erreur" : exception.getReason());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception exception) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Une erreur interne est survenue. Veuillez réessayer plus tard.");
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String message) {
        ErrorResponse response = new ErrorResponse(status.value(), message, LocalDateTime.now());
        return ResponseEntity.status(status).body(response);
    }
}
