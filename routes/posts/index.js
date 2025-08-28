import {Router} from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    likePost,
    unlikePost,
    updatePost
} from "../../controllers/posts/index.js";

const router = Router();

router.post("/", createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/:postId/like", likePost);
router.delete("/:postId/like", unlikePost);

export default router;
