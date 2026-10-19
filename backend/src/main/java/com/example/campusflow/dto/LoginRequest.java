package com.example.campusflow.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "L'e-mail est obligatoire.")
    @Email(message = "Veuillez saisir une adresse e-mail valide.")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire.")
    private String password;
}
