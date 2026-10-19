package com.example.campusflow.dto;

import com.example.campusflow.enums.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private Role role;
    private Boolean autorisePublication;
}
