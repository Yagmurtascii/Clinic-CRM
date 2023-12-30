package com.klinik.project.service;



import com.klinik.project.model.ReservationModel;
import com.klinik.project.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository repository;

    @Transactional
    public void createReservation(ReservationModel reservationModel) {
        repository.save(reservationModel);
    }

    public List<ReservationModel> getAll() {
        return repository.findAll();
    }

    public List<ReservationModel> getReservationsByPatientId(Long patientId) {
        return repository.findByPatientIdOrderByDueDateAsc(patientId);
    }

    public void deleteById(Long patientId) {
         repository.deleteById(patientId);
    }
}
