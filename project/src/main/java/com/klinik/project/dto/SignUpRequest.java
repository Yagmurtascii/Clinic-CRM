package com.klinik.project.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;

@Data
public class SignUpRequest {

    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String phoneNumber;
    private String gender;
    private Date birthday;
    private String whereDidYouFindUs;
    private String familyMemberFirstName;
    private String familyMemberLastName;
    private String familyMemberPhoneNumber;
    private String email;
    private String role="USER";

}
