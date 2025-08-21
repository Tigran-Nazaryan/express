import { Follows } from '../models/models.js';

export async function createFollow(followerId, followingId) {
    if (followerId === followingId) {
        throw new Error(`You can't subscribe to yourself`);
    }

    const [follow, created] = await Follows.findOrCreate({
        where: { followerId, followingId },
    });

    if (!created) {
        throw new Error('You are already subscribed to this author');
    }

    return follow;
}

export async function deleteFollow(followerId, followingId) {
    const deletedCount = await Follows.destroy({
        where: { followerId, followingId }
    });

    if (deletedCount === 0) {
        throw new Error('Subscription not found');
    }

    return true;
}
