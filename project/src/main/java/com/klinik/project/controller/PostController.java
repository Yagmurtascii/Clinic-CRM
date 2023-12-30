package com.klinik.project.controller;


import com.klinik.project.model.PostModel;
import com.klinik.project.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
public class PostController {

    private PostService postService;


    @GetMapping("/")
    public List<PostModel> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping("/")
    public PostModel createPost(@RequestBody PostModel post) {
        return postService.createPost(post);
    }

    @GetMapping("/:{postId}")
    public ResponseEntity<PostModel> getPostById(@PathVariable  Long postId) {
        Optional<PostModel> postOptional = postService.getPostById(postId);
        if (postOptional.isPresent()) {
            return new ResponseEntity<>(postOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @DeleteMapping("/{postId}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Long postId) {
        try {
            postService.deleteById(postId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/update")
    public ResponseEntity<PostModel> updatePost(@RequestBody PostModel postModel) {
        if (postService.updatePost(postModel.getId(), postModel.getContent()) != null)
            return ResponseEntity.ok(postService.updatePost(postModel.getId(), postModel.getContent()));
        else
            return ResponseEntity.notFound().build();

    }
}


