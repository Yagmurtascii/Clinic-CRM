package com.klinik.project.repository;


import com.klinik.project.model.ReservationModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationModel,Long> {

    List<ReservationModel> findByPatientIdOrderByDueDateAsc(Long patientId);
    void deleteById(Long id);

}
