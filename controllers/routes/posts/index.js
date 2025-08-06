import {Router} from "express";
import {getPosts, getPostsById} from "../../posts/index.js";


const router = Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostsById)

export default router;