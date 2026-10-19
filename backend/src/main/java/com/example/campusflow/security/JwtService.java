package com.example.campusflow.security;

import com.example.campusflow.entity.Utilisateur;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final String secret;
    private final long expirationMs;

    public JwtService(
        @Value("${jwt.secret}") String secret,
        @Value("${jwt.expiration-ms}") long expirationMs
    ) {
        this.secret = secret;
        this.expirationMs = expirationMs;
    }

    public String generateToken(Utilisateur utilisateur) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", utilisateur.getId());
        claims.put("role", utilisateur.getRole().name());

        return Jwts.builder()
            .claims(claims)
            .subject(utilisateur.getEmail())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expirationMs))
            .signWith(getSigningKey(), Jwts.SIG.HS256)
            .compact();
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return claims.getExpiration() != null && !claims.getExpiration().before(new Date());
        } catch (Exception exception) {
            return false;
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
