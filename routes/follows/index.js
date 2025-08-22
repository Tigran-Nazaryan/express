import {Router} from "express";
import {checkFollowStatus, followUser, getFollowsPosts, unfollowUser} from "../../controllers/follows/index.js";

const router = Router();

router.post('/:followingId', followUser);
router.delete('/:followingId', unfollowUser);
router.get('/getFollowsPosts', getFollowsPosts);
router.get('/check/:followingId', checkFollowStatus);

export default router;