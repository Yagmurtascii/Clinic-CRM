package com.klinik.project.controller;


import com.klinik.project.model.ReservationModel;
import com.klinik.project.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/reservations")


public class ReservationController {
    private final ReservationService service;

    @GetMapping("/")
    public List<ReservationModel> getAllPosts() {
        return service.getAll();
    }

    @PostMapping("/")
    public void createReservation(@RequestBody ReservationModel reservationModel) {
        service.createReservation(reservationModel);
    }

    @GetMapping("/{patientId}")
    public List<ReservationModel> getReservationsByPatientId(@PathVariable Long patientId)
    {
        return service.getReservationsByPatientId(patientId);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id)
    {
        service.deleteById(id);
    }
}