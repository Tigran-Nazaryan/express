import {postSchema} from "../../validations/post.validation.js";
import postService from "../../service/post-service.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getPosts(req.user.id);
        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to retrieve posts' });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        return res.status(200).json({ data: post });
    } catch (error) {
        res.status(error.message === 'Post not found' ? 404 : 500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { body, user } = req;

        const { error } = postSchema.validate(body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        body.userId = user.id;

        const post = await postService.createPost(req.body);
        return res.status(201).json(post);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const updatePost = async (req, res) => {
    const { error } = postSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const post = await postService.updatePost(req.params.id, req.body);
        return res.status(200).json(post);
    } catch (error) {
        res.status(error.message === 'Post not found' ? 404 : 500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const result = await postService.deletePost(req.params.id);
        return res.status(200).json(result);
    } catch (error) {
        res.status(error.message === 'Post not found' ? 404 : 500).json({ message: error.message });
    }
};
