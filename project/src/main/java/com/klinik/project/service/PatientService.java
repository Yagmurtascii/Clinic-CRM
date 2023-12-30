package com.klinik.project.service;


import com.klinik.project.model.PatientModel;
import com.klinik.project.repository.PatientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PatientService {
    private PatientRepository repo;

    @Transactional
    public PatientModel checkPatient(String userName, String password) {
        return repo.findByUserNameAndPassword(userName, password);
    }

    public Optional<PatientModel> getById(Long id)
    {
        return repo.findById(id);
    }


    public List<PatientModel> getAllPatientsPartial() {
        return repo.findAll().stream()
                .map(patients -> {
                    PatientModel patient = new PatientModel();
                    patient.setId(patients.getId());
                    patient.setFirstName(patients.getFirstName());
                    patient.setLastName(patients.getLastName());
                    patient.setBirthday(patients.getBirthday());
                    patient.setGender(patients.getGender());
                    patient.setPhoneNumber(patients.getPhoneNumber());
                    patient.setFamilyMemberFirstName(patients.getFamilyMemberFirstName());
                    patient.setFamilyMemberLastName(patients.getFamilyMemberLastName());
                    patient.setFamilyMemberPhoneNumber(patients.getFamilyMemberPhoneNumber());
                    patient.setWhereDidYouFindUs(patients.getWhereDidYouFindUs());
                    patient.setRole(patients.getRole());
                    return patient;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void updatePatient(PatientModel patient) {
        try {
            repo.save(patient
            );
        } catch (Exception e) {
            // Handle exceptions or log errors
            e.printStackTrace();
            throw new RuntimeException("Failed to add new patient", e);
        }
    }

    @Transactional
    public void checkMail(String email, String password) {
        try {
            repo.existsByEmailAndPassword(
                    email,
                    password
            );
        } catch (Exception e) {
            // Handle exceptions or log errors
            e.printStackTrace();
            throw new RuntimeException("Failed to update", e);
        }
    }

    public boolean isEmailValid(String email) {
        Optional<PatientModel> patientOptional = repo.findByEmail(email);
        return patientOptional.isPresent();
    }

    public boolean isUsernameValid(String username) {
        PatientModel patientOptional = repo.findByUserName(username);
        if (patientOptional != null)
            return true;

        else return false;
    }

    public PatientModel getByFirstnameOrLastname(String firstName, String lastName) {
        return repo.findByFirstNameContainingOrLastNameContaining(firstName, lastName);
    }
    public PatientModel findByToken(String token) {
        return repo.findByToken(token);
    }

    public  PatientModel getByUserName(String username){
        return repo.findByUserName(username);
    }

    public void saveToken(String token) {
        PatientModel tokenEntity = new PatientModel();
        tokenEntity.setToken(token);
        repo.save(tokenEntity);
    }


    public PatientModel getOneUserByUserName(String userName) {
        return repo.findByUserName(userName);
    }

    public void saveOneUser(PatientModel patientModel1) {
        repo.save(patientModel1);
    }
}
