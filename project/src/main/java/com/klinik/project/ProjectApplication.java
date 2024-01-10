package com.klinik.project;

import com.klinik.project.model.PatientModel;
import com.klinik.project.model.Role;
import com.klinik.project.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class ProjectApplication implements CommandLineRunner {

	@Autowired
	private PatientRepository patientRepository;
	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		PatientModel adminAccount=patientRepository.findByRole(Role.ADMIN);
		if(null==adminAccount) {
			PatientModel patientModel = new PatientModel();
			patientModel.setUserName("admin");
			patientModel.setFirstName("admin");
			patientModel.setLastName("admin");
			patientModel.setEmail("yagmur_tasrtrcii@hotmail.com");
			patientModel.setRole(Role.valueOf(Role.ADMIN.name()));
			patientModel.setGender(null);
			patientModel.setPhoneNumber(null);
			patientModel.setPassword(new BCryptPasswordEncoder().encode("admin"));
			patientRepository.save(patientModel);
		}
	}
}
