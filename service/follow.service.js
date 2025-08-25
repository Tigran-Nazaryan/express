import {Follow, User, Post} from '../models/models.js';

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
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName'],
        }],
    });

    const postsWithIsFollowing = posts.map(post => {
        post.user.dataValues.isFollowing = true;
        return post;
    });

    return postsWithIsFollowing;
}

export async function checkIfFollowing(followerId, followingId) {
    const follow = await Follow.findOne({
        where: { followerId, followingId },
    });

    return !!follow;
}

