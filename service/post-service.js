import { Post, User } from "../models/models.js";

const getPosts = async () => {
    return await Post.findAll({
        include: {
            model: User,
            as: "user"
        }
    });
};

const getPostById = async (id) => {
    const post = await Post.findByPk(id, {
        include: {
            model: User,
            as: "user",
        },
    });

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
};

const createPost = async (body) => {
    const userId = Number(body.userId);

    let user = await User.findByPk(userId);
    if (!user) {
        user = await User.create({
            firstName: body.user.firstName,
            lastName: body.user.lastName,
            email: body.user.email,
            password: body.user.password
        });
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
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');

    await post.update(updateData);
    return post;
};

const deletePost = async (id) => {
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');

    await post.destroy();
    return { message: 'Post deleted successfully' };
};

export default {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
