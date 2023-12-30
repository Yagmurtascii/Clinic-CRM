package com.klinik.project.repository;


import com.klinik.project.model.PostModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<PostModel, Long> {

    Optional<PostModel> findById(Long id);

    void deleteById(Long id);



}
