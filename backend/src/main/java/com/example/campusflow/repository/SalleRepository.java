package com.example.campusflow.repository;

import com.example.campusflow.entity.Salle;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalleRepository extends JpaRepository<Salle, Long> {

    Optional<Salle> findByNom(String nom);
}
