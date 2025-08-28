import {Comment, User, Post, CommentLike} from "../models/models.js";

export const createComment = async ({postId, userId, content}) => {
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
        where: {postId},
        include: {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'ASC']],
    });
};

export const getPostsWithComments = async (userId) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Comment,
                as: 'comments',
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'firstName', 'lastName'],
                    },
                ],
            },
        ],
    });

    const user = await User.findByPk(userId, {
        include: {
            model: User,
            as: 'Following',
        },
    });

    const followingIds = user.Following.map(f => f.id);

    return posts.map(post => {
        const jsonPost = post.toJSON();
        jsonPost.user.isFollowing = followingIds.includes(post.userId);
        return jsonPost;
    });
};

export const commentLike = async (userId, commentId) => {
    // Проверяем, есть ли уже лайк от этого пользователя на этот комментарий
    const existingLike = await CommentLike.findOne({
        where: {userId, commentId},
    });

    if (existingLike) {
        throw new Error("You have already liked this comment");
    }

    return await CommentLike.create({userId, commentId});
};

export const commentUnlike = async (userId, commentId) => {
    const like = await CommentLike.findOne({
        where: {userId, commentId},
    });

    if (!like) {
        throw new Error("Like not found");
    }

    await like.destroy();
    return {message: "Comment like removed"};
};