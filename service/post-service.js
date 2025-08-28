import {Post, User, PostLike} from "../models/models.js";
import {Model as Like} from "sequelize";

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

const getPosts = async (userId) => {
    let posts = await Post.findAll({
        include: {
            model: User,
            as: "user"
        }
    });

    const user = await User.findByPk(userId, {
        attributes: ["id"],
        include: {
            model: User,
            as: "Following"
        }
    });

    const userFollowingIds = user.Following.map(f => f.id);

    posts = posts.map(post => {
        post.user.dataValues.isFollowing = userFollowingIds.includes(post.user.id);
        return post;
    });

    return posts;
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
    if (!existingLike) {
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
    await Like.destroy();
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
