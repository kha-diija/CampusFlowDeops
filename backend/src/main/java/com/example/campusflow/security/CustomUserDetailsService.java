package com.example.campusflow.security;

import com.example.campusflow.entity.Utilisateur;
import com.example.campusflow.repository.UtilisateurRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));

        String authority = "ROLE_" + utilisateur.getRole().name();

        return new User(
            utilisateur.getEmail(),
            utilisateur.getMotDePasse(),
            List.of(new SimpleGrantedAuthority(authority))
        );
    }
}
