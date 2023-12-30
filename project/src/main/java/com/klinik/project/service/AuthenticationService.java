package com.klinik.project.service;


import com.klinik.project.dto.JwtAuthenticationResponse;
import com.klinik.project.dto.RefreshTokenRequest;
import com.klinik.project.dto.SignInRequest;
import com.klinik.project.dto.SignUpRequest;
import com.klinik.project.model.PatientModel;

public interface AuthenticationService {
     PatientModel signUp(SignUpRequest signUpRequest);

     JwtAuthenticationResponse signin(SignInRequest signInRequest);

     JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
