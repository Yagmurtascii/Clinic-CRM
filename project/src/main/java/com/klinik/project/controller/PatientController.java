package com.klinik.project.controller;

import com.klinik.project.model.PatientModel;
import com.klinik.project.service.AuthenticationService;
import com.klinik.project.service.JWTService;
import com.klinik.project.service.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@AllArgsConstructor
@RequestMapping("/patients")
public class PatientController {

    PatientService service;
    private final AuthenticationService authenticationService;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    // GET /posts
    // POST /posts
    // GET /posts/:id
    // DELETE /posts/:id
    // PATCH /posts/:id

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user")
    public PatientModel getUserInfo(@RequestHeader(name = "Authorization") String authorizationHeader) {
        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtService.extractUserName(jwt);
            System.out.println(username);
            if (username != null) {
                return service.getByUserName(username);
            }
        }
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientModel> getById(@PathVariable  Long id) {
        Optional<PatientModel> patientModel = service.getById(id);
        if (patientModel.isPresent()) {
            return new ResponseEntity<>(patientModel.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<HttpStatus> updatePatient(@RequestBody PatientModel patient) {
        try {
                patient.setPassword(passwordEncoder.encode(patient.getPassword()));
                service.updatePatient(patient);
                System.out.println("eşleşir");
                return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/checkMail")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<HttpStatus> checkMail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            password = passwordEncoder.encode(password);
            System.out.println(service.isEmailValid(email));
            if (service.isEmailValid(email)) {
                service.updatePassword(email, password);
                return ResponseEntity.ok(HttpStatus.CREATED);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
               return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<PatientModel>> getAllPatients() {
        List<PatientModel> patients = service.getAllPatientsPartial();
        if (patients.isEmpty()) {
            System.out.println("Liste boş");
            return ResponseEntity.notFound().build();
        } else {
            System.out.println(patients);
            return ResponseEntity.ok().body(patients);
        }
    }


}
