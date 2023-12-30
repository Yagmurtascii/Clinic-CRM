package com.klinik.project.repository;


import com.klinik.project.model.PatientModel;
import com.klinik.project.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<PatientModel,Long> {
    PatientModel findByUserNameAndPassword(String userName, String password);

    boolean existsByEmailAndPassword(String email, String password);

    Optional<PatientModel> findByEmail (String email);
    PatientModel findByUserName (String username);
    Optional<PatientModel> findById(Long id);
    PatientModel findByToken(String token);
    PatientModel findByRole(Role role);
    PatientModel findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);

}
