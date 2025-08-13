import {postSchema} from "../validations/post.validation.js";
import { User, Post } from "../../models/models.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                as: "user",
            }
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Failed to retrieve posts' });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: {
                model: User,
                as: "user",
            },
        });

        if (!post) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json({ data: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Failed to retrieve post' });
    }
};

export const createPost = async (req, res) => {
    try {
        const { body } = req;
        const { error } = postSchema.validate(body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        let user = await User.findByPk(body.userId);

        if (!user) {
            user = await User.create({
                id: body.userId,
                firstName: body.author || 'DefaultFirstName',
                lastName: 'DefaultLastName',
                email: `user${body.userId}@example.com`
            });
        }

        const post = await Post.create(req.body);
        return res.status(201).json(post);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

export const updatePost = async (req, res) => {
    const { error } = postSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.update(req.body);
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Failed to update post' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.destroy();
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Failed to delete post' });
    }
};
