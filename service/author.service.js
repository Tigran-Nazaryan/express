import {User, Post, Comment, PostLike, CommentLike} from "../models/models.js";

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
                            },
                            {
                                model: CommentLike,
                                as: 'likes',
                                attributes: ['userId'],
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
                    },
                    {
                        model: CommentLike,
                        as: 'likes',
                        attributes: ['userId'],
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

    const followingIds = currentUser.Following.map(f => f.id);

    author.dataValues.isFollowing = followingIds.includes(Number(userId));

    author.posts = author.posts.map(post => {
        const postLikeUserIds = post.likes.map(like => like.userId);
        post.dataValues.likesCount = postLikeUserIds.length;
        post.dataValues.isLiked = postLikeUserIds.includes(Number(currentUserId));
        post.dataValues.user = {
            isFollowing: author.dataValues.isFollowing,
        };
        delete post.dataValues.likes;

        if (post.comments && Array.isArray(post.comments)) {
            post.comments = post.comments.map(comment => {
                const commentLikeUserIds = (comment.likes || []).map(like => like.userId);
                comment.dataValues.likesCount = commentLikeUserIds.length;
                comment.dataValues.isLiked = commentLikeUserIds.includes(Number(currentUserId));
                return comment;
            });
        }

        return post;
    });

    if (author.comments && Array.isArray(author.comments)) {
        author.comments = author.comments.map(comment => {
            const commentLikeUserIds = (comment.likes || []).map(like => like.userId);
            comment.dataValues.likesCount = commentLikeUserIds.length;
            comment.dataValues.isLiked = commentLikeUserIds.includes(Number(currentUserId));
            return comment;
        });
    }

    return author;
};
