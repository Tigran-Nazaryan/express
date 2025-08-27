import {User, Post, Comment} from "../models/models.js";

export const getAuthorWithPosts = async (userId) => {
    return await User.findByPk(userId, {
        include: [
            {
                model: Post,
                as: 'posts',
                include: [
                    {
                        model: Comment,
                        as: 'comments',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'firstName', 'lastName']
                            }
                        ]
                    }
                ]
            },
            {
                model: Comment,
                as: 'comments',
                include: [
                    {
                        model: Post,
                        as: 'post',
                        attributes: ['id', 'title']
                    }
                ]
            }
        ],
        attributes: {
            exclude: ["password"]
        }
    });
};
