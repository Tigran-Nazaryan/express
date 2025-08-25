import { Comment, User } from "../models/models.js";

export const createComment = async ({ postId, userId, content }) => {
    const comment = await Comment.create({
        postId,
        userId,
        content,
    });
    return await Comment.findByPk(comment.id, {
        include: {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName'],
        },
    });
};

export const getCommentsByPost = async (postId) => {
    return await Comment.findAll({
        where: { postId },
        include: {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'ASC']],
    });
};
