import {Router} from "express";
import {
    createComment,
    getCommentsByPost,
    likeComment,
    unlikeComment
} from "../../controllers/comments/index.js";

const router = Router();

router.post('/', createComment);
router.get('/posts/:postId/comments', getCommentsByPost);

router.post('/:commentId/like', likeComment);
router.delete('/:commentId/like', unlikeComment);


export default router;