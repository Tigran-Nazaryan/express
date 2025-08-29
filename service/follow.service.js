import {Comment, CommentLike, Follow, Post, PostLike, User} from '../models/models.js';

export async function createFollow(followerId, followingId) {
    if (followerId === followingId) {
        throw new Error(`You can't subscribe to yourself`);
    }

    const [follow, created] = await Follow.findOrCreate({
        where: { followerId, followingId },
    });

    if (!created) {
        throw new Error('You are already subscribed to this author');
    }

    return follow;
}

export async function deleteFollow(followerId, followingId) {
    const deletedCount = await Follow.destroy({
        where: { followerId, followingId }
    });

    if (deletedCount === 0) {
        throw new Error('Subscription not found');
    }

    return true;
}

export async function getFollowedUsersPosts(followerId) {
    const follows = await Follow.findAll({
        where: { followerId },
        attributes: ['followingId'],
    });

    const followingIds = follows.map(f => f.followingId);

    if (followingIds.length === 0) {
        return [];
    }

    const posts = await Post.findAll({
        where: {
            userId: followingIds,
        },
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

    return posts.map(post => {
        const jsonPost = post.toJSON();

        const postLikeUserIds = jsonPost.likes.map(like => like.userId);
        jsonPost.likesCount = postLikeUserIds.length;
        jsonPost.isLiked = postLikeUserIds.includes(followerId);
        delete jsonPost.likes;

        jsonPost.user.isFollowing = true;

        if (jsonPost.comments && Array.isArray(jsonPost.comments)) {
            jsonPost.comments = jsonPost.comments.map(comment => {
                const commentLikeUserIds = (comment.likes || []).map(like => like.userId);

                return {
                    ...comment,
                    likesCount: commentLikeUserIds.length,
                    isLiked: commentLikeUserIds.includes(followerId),
                };
            });
        }

        return jsonPost;
    });
}


export async function checkIfFollowing(followerId, followingId) {
    const follow = await Follow.findOne({
        where: { followerId, followingId },
    });

    return !!follow;
}

