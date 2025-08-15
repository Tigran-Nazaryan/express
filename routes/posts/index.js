import {Router} from "express";
import {createPost, deletePost, getAllPosts, getPostById, updatePost} from "../../controllers/posts/index.js";


const router = Router();

router.post("/posts", createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;