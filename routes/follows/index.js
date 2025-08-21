import {Router} from "express";
import {followUser, unfollowUser} from "../../controllers/follows/index.js";

const router = Router();

router.post('/:followingId', followUser);
router.delete('/:followingId', unfollowUser);


export default router;