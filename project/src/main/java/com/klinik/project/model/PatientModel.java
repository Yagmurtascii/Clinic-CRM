package com.klinik.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.List;


@Entity
@Data
@Table(name = "patientTable")
@AllArgsConstructor
@NoArgsConstructor
public class PatientModel implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String firstName;
    String lastName;
    @Column(unique = true)
    String userName;
    String password;
    String gender;
    Date birthday;
    String phoneNumber;
    String familyMemberFirstName;
    String familyMemberLastName;
    String familyMemberPhoneNumber;
    String whereDidYouFindUs;
    @Column(unique = true)
    String email;
    String token;
    @Enumerated(EnumType.STRING)
    @Column(length = 20) // adjust the length based on your enum values
    private Role role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

