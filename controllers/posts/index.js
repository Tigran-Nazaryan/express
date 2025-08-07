import * as postService from '../../services/postService.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({
            message: 'Posts found successfully',
            data: posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error?.message || 'Something went wrong',
        });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found with id " + id });
        }

        res.status(200).json({
            message: 'Post found successfully',
            data: post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error?.message || 'Something went wrong',
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, avatar, body, author } = req.body;
        if (!title || !body || !author) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newPost = await postService.createPost({ title, avatar, body, author });
        res.status(201).json({ message: 'Post created', data: newPost });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const updated = await postService.updatePost(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json({ message: 'Post updated', data: updated });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const deleted = await postService.deletePost(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Post not found' });

        res.status(204).send(); // Успешно удалено, ничего не возвращаем
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

