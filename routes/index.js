import {Router} from "express";
import postsRouter from "./posts/index.js";
import authRouter from "./auth/index.js";

const router = Router();

router.use("/posts", postsRouter);
router.use("/auth", authRouter);

export default router;