import {postSchema} from "../../validations/post.validation.js";
import postService from "../../service/post.service.js";

export const getAllPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const search = req.query.search || '';
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.size, 10) || 10));

        const result = await postService.getPosts(userId, search, page, limit);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "Server error" });
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

export const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;

        const like = await postService.likePost(postId, userId);
        return res.status(201).json(like);
    } catch (error) {
        const status = error.message.includes("already liked") ? 409 : 400
        res.status(status).json({ message: error.message });
    }
}

export const unlikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;

        const result = await postService.unLikePost(postId, userId);

        res.status(200).json(result);
    } catch (error) {
        const status = error.message.includes("not found") ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};