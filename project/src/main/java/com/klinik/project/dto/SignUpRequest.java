package com.klinik.project.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;

@Data
public class SignUpRequest {

    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String password;
    String gender;
    Date birthday;
    String phoneNumber;
    String familyMemberFirstName;
    String familyMemberLastName;
    String familyMemberPhoneNumber;
    String whereDidYouFindUs;
    String role="USER";

}
