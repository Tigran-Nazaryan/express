import {Router} from "express";
import postsRouter from "./posts/index.js";
import authRouter from "./auth/index.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = Router();

router.use("/posts", authMiddleware, postsRouter);
router.use("/auth", authRouter);

export default router;