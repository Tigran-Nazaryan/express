import {createFollow, deleteFollow} from "../../service/follow.service.js";

export async function followUser(req, res) {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.followingId);

    try {
        await createFollow(followerId, followingId);
        res.status(201).json({ message: 'Subscription completed' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function unfollowUser(req, res) {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.followingId);

    try {
        await deleteFollow(followerId, followingId);
        res.json({ message: 'Unsubscribe successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
