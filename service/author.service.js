import {User, Post, Comment} from "../models/models.js";

export const getAuthorWithPosts = async (userId, currentUserId) => {
    const author = await User.findByPk(userId, {
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

    if (!author) return null;

    if (!currentUserId) {
        author.dataValues.isFollowing = false;
        return author;
    }

    const currentUser = await User.findByPk(currentUserId, {
        include: [{
            model: User,
            as: 'Following',
            attributes: ['id']
        }],
        attributes: ['id']
    });

    const followingIds = currentUser?.Following.map(f => f.id) || [];

    author.dataValues.isFollowing = followingIds.includes(Number(userId));

    return author;
};
