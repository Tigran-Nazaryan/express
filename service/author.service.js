import { User, Post } from "../models/models.js";

export const getAuthorWithPosts = async (userId) => {
    return await User.findByPk(userId, {
        include: [{ model: Post, as: 'posts' }],
        attributes: {
            exclude: ["password"]
        }
    });
};
