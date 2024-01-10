package com.klinik.project.service.impl;


import com.klinik.project.dto.JwtAuthenticationResponse;
import com.klinik.project.dto.RefreshTokenRequest;
import com.klinik.project.dto.SignInRequest;
import com.klinik.project.dto.SignUpRequest;
import com.klinik.project.model.PatientModel;
import com.klinik.project.model.Role;
import com.klinik.project.repository.PatientRepository;
import com.klinik.project.service.AuthenticationService;
import com.klinik.project.service.JWTService;
import com.klinik.project.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PatientRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    public PatientModel signUp(SignUpRequest signUpRequest) {
        PatientModel user=new PatientModel();
        user.setUserName(signUpRequest.getUserName());
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(Role.USER);
        user.setEmail(signUpRequest.getEmail());
        user.setGender(signUpRequest.getGender());
        user.setFamilyMemberFirstName(signUpRequest.getFamilyMemberFirstName());
        user.setFamilyMemberLastName(signUpRequest.getFamilyMemberLastName());
        return repo.save(user);
    }
    public JwtAuthenticationResponse signin(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUserName(),signInRequest.getPassword()));
        var user=repo.findByUserName(signInRequest.getUserName());
        var jwt=jwtService.generateToken(user);
        var refreshToken=jwtService.generateRefreshToken(new HashMap<>(),user);
        JwtAuthenticationResponse jwtAuthenticationResponse=new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest)
    {
        String userName=jwtService.extractUserName(refreshTokenRequest.getToken());
        PatientModel user=repo.findByUserName(userName);
        if(jwtService.isTokenValid(refreshTokenRequest.getToken(),user))
        {
            var jwt=jwtService.generateToken(user);
            JwtAuthenticationResponse jwtAuthenticationResponse=new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
    }

}
