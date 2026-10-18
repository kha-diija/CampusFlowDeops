package com.example.campusflow.entity;

import java.util.ArrayList;
import java.util.List;

import com.example.campusflow.enums.TypeSalle;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "salle")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Salle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "batiment", nullable = false)
    private String batiment;

    @Column(name = "capacite", nullable = false)
    private int capacite;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeSalle type;

    @Column(name = "equipements")
    private String equipements;

    @OneToMany(mappedBy = "salle", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Reservation> reservations = new ArrayList<>();
}
