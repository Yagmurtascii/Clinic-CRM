package com.klinik.project.service;


import com.klinik.project.model.PostModel;
import com.klinik.project.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private PostRepository postRepository;

    public List<PostModel> getAllPosts() {
        return postRepository.findAll();
    }

    public PostModel createPost(PostModel post) {
        return postRepository.save(post);
    }

    public Optional<PostModel> getPostById(Long postId) {
        return postRepository.findById(postId);
    }

    public void deleteById(Long id) {
        postRepository.deleteById(id);
    }

    public Optional<PostModel> findById(Long id) {
        return postRepository.findById(id);
    }

    public PostModel updatePost(Long id, String content) {
        Optional<PostModel> post = postRepository.findById(id);

        if (post.isPresent()) {
            PostModel postModel1 = post.get();
            postModel1.setContent(content);
            return postRepository.save(postModel1);
        }
        return null;
    }


}
