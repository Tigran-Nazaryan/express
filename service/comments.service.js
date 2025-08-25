import { Comment, User } from "../models/models.js";

export const createComment = async ({ postId, userId, content }) => {
    return await Comment.create({
        postId,
        userId,
        content,
    });
};

export const getCommentsByPost = async (postId) => {
    return await Comment.findAll({
        where: { postId },
        include: {
            model: User,
            as: 'user',
            attributes: ['id'],
        },
        order: [['createdAt', 'ASC']],
    });
};
