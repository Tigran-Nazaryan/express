import * as commentService from "../../service/comments.service.js";

export const createComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, content, parentId } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ error: "Content is required" });
        }

        if (!postId) {
            return res.status(400).json({ error: "Post ID is required" });
        }

        if (parentId) {
            const parentComment = await commentService.getCommentById(parentId);

            if (!parentComment) {
                return res.status(400).json({ error: "Parent comment does not exist" });
            }

            if (parentComment.postId !== postId) {
                return res.status(400).json({ error: "Parent comment does not belong to this post" });
            }
        }

        const comment = await commentService.createComment({
            postId,
            userId,
            content,
            parentId: parentId || null,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
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