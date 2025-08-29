import {Post, User, PostLike, Comment, CommentLike} from "../models/models.js";

const findPostOrThrow = async (id) => {
    const post = await Post.findByPk(id, {
        include: {
            model: User,
            as: "user",
        },
    });

    if (!post) {
        throw new Error("Post not found");
    }

    return post;
};

// export const getPosts = async (userId) => {
//     const posts = await Post.findAll({
//         include: [
//             {
//                 model: User,
//                 as: 'user',
//                 attributes: ['id', 'firstName', 'lastName'],
//             },
//             {
//                 model: Comment,
//                 as: 'comments',
//                 include: [
//                     {
//                         model: User,
//                         as: 'user',
//                         attributes: ['id', 'firstName', 'lastName'],
//                     },
//                 ],
//             },
//             {
//                 model: PostLike,
//                 as: 'likes',
//                 attributes: ['userId'],
//             }
//         ],
//     });
//
//     const user = await User.findByPk(userId, {
//         include: {
//             model: User,
//             as: 'Following',
//             attributes: ['id']
//         },
//     });
//
//     const followingIds = user.Following.map(f => f.id);
//
//     return posts.map(post => {
//         const jsonPost = post.toJSON();
//
//         const likeUserIds = jsonPost.likes.map(like => like.userId);
//
//         jsonPost.user.isFollowing = followingIds.includes(post.userId);
//         jsonPost.likesCount = likeUserIds.length;
//         jsonPost.isLiked = likeUserIds.includes(userId);
//
//         delete jsonPost.likes;
//
//         return jsonPost;
//     });
// };

export const getPosts = async (userId) => {
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
                    {
                        model: CommentLike,
                        as: 'likes',
                        attributes: ['userId'],
                    },
                ],
            },
            {
                model: PostLike,
                as: 'likes',
                attributes: ['userId'],
            },
        ],
    });

    // Получаем подписки текущего пользователя
    const user = await User.findByPk(userId, {
        include: {
            model: User,
            as: 'Following',
            attributes: ['id'],
        },
    });

    const followingIds = user.Following.map(f => f.id);

    return posts.map(post => {
        const jsonPost = post.toJSON();

        const postLikeUserIds = jsonPost.likes.map(like => like.userId);
        jsonPost.likesCount = postLikeUserIds.length;
        jsonPost.isLiked = postLikeUserIds.includes(userId);
        jsonPost.user.isFollowing = followingIds.includes(post.userId);
        delete jsonPost.likes;

        if (jsonPost.comments && Array.isArray(jsonPost.comments)) {
            jsonPost.comments = jsonPost.comments.map(comment => {
                const commentLikeUserIds = (comment.likes || []).map(like => like.userId);

                return {
                    ...comment,
                    likesCount: commentLikeUserIds.length,
                    isLiked: commentLikeUserIds.includes(userId),
                };
            });
        }

        return jsonPost;
    });
};


const getPostById = async (id) => {
    return await findPostOrThrow(id);
};

const createPost = async (body) => {
    const userId = Number(body.userId);

    let user = await User.findByPk(userId);

    if (!user && body.user) {
        user = await User.create({
            firstName: body.user.firstName,
            lastName: body.user.lastName,
            email: body.user.email,
            password: body.user.password
        });
    }

    if (!user) {
        throw new Error("User not found or no user data provided");
    }

    const author = `${user.firstName} ${user.lastName}`;

    return await Post.create({
        title: body.title,
        body: body.body,
        avatar: body.avatar,
        author,
        userId: user.id,
    });
};

const updatePost = async (id, updateData) => {
    const post = await findPostOrThrow(id);
    await post.update(updateData);
    return post;
};

const deletePost = async (id) => {
    const post = await findPostOrThrow(id);
    await post.destroy();
    return {message: "Post deleted successfully"};
};

const likePost = async (postId, userId) => {
    const posts = await Post.findByPk(postId);
    if (!posts) {
        throw new Error("Post not found");
    }

    const existingLike = await PostLike.findOne({
        where: {postId, userId}
    });
    if (existingLike) {
        throw new Error("Post already liked by this user");
    }

    const like = await PostLike.create({postId, userId});
    return like;
}

const unLikePost = async (postId, userId) => {
    const like = await PostLike.findOne({
        where: {postId, userId}
    });

    if (!like) {
        throw new Error("Like not found");
    }

    await like.destroy();

    return {message: "Like removed"};
}

export default {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unLikePost
};
