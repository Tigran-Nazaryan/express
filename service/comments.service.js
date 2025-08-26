import { Comment, User, Post } from "../models/models.js";

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

// export const getPostsWithComments = async () => Post.findAll({
//     include: [
//         {
//             model: User,
//             as: 'user',
//             attributes: ['id', 'firstName', 'lastName'],
//         },
//         {
//             model: Comment,
//             as: 'comments',
//             include: [
//                 {
//                     model: User,
//                     as: 'user',
//                     attributes: ['id', 'firstName', 'lastName'],
//                 },
//             ],
//         },
//     ],
//
// });

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
