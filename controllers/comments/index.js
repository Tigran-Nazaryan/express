import * as commentService from "../../service/comments.service.js";

export const createComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, content } = req.body;

        const comment = await commentService.createComment({ postId, userId, content });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await commentService.getCommentsByPost(postId);

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
