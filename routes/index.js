import {Router} from "express";
import postsRouter from "./posts/index.js";
import authRouter from "./auth/index.js";
import authMiddleware from "../middleware/auth-middleware.js";
import authorRouter from "./authors/index.js";
import followsRouter from "./follows/index.js";
import commentsRouter from "./comments/index.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/posts", authMiddleware, postsRouter);
router.use("/authors", authMiddleware, authorRouter);
router.use("/follows", authMiddleware, followsRouter)
router.use("/comments", commentsRouter )

export default router;