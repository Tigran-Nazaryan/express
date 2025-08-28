import * as commentService from "../../service/comments.service.js";

export const createComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {postId, content} = req.body;

        const comment = await commentService.createComment({postId, userId, content});

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const {postId} = req.params;

        const comments = await commentService.getCommentsByPost(postId);

        res.json(comments);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getPostsWithComments = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({error: 'userId is required'});
        }

        const posts = await commentService.getPostsWithComments(userId);
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts with comments:", err);
        res.status(500).json({error: "Server error"});
    }
};

export const likeComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.commentId;

        const like = await commentService.commentLike(userId, commentId);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const unlikeComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.commentId;

        const result = await commentService.commentUnlike(userId, commentId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};