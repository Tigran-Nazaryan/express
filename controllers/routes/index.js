import {Router} from "express";
import postsRouter from "./posts/index.js";

const router = Router();

router.use(postsRouter);

export default router;