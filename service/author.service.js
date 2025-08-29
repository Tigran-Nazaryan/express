import {User, Post, Comment, PostLike} from "../models/models.js";

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
                    },
                    {
                        model: PostLike,
                        as: 'likes',
                        attributes: ['userId'],
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

    const currentUser = await User.findByPk(currentUserId, {
        include: [{
            model: User,
            as: 'Following',
            attributes: ['id']
        }],
        attributes: ['id']
    });

    if (!currentUser) {
        throw new Error('Current user does not exist');
    }

    const followingIds = currentUser?.Following.map(f => f.id) || [];

    author.dataValues.isFollowing = followingIds.includes(Number(userId));

    author.posts = author.posts.map(post => {
        const likeUserIds = post.likes.map(like => like.userId);
        post.dataValues.likesCount = likeUserIds.length;
        post.dataValues.user = {
            isFollowing: author.dataValues.isFollowing
        };
        post.dataValues.isLiked = likeUserIds.includes(Number(currentUserId));
        delete post.dataValues.likes;

        return post;
    });

    return author;
};
