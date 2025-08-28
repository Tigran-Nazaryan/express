import {Router} from "express";
import {createComment, getCommentsByPost, getPostsWithComments} from "../../controllers/comments/index.js";

const router = Router();

router.post('/comments', createComment);
router.get('/posts/:postId/comments', getCommentsByPost);
router.get("/postsWithComments", getPostsWithComments);

router.post('/comments/:commentId/like', likeComment);
router.delete('/comments/:commentId/like', unlikeComment);


export default router;