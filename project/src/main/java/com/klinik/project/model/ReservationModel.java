package com.klinik.project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Date dueDate;
    private String time;
    @Column(name = "patient_id") // Bu kısım eklenmiştir
    private Long patientId; // Sadece hastanın id'sini tutan alan

}
