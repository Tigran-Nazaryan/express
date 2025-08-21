import {Router} from "express";
import postsRouter from "./posts/index.js";
import authRouter from "./auth/index.js";
import authMiddleware from "../middleware/auth-middleware.js";
import authorRouter from "./authors/index.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/posts", authMiddleware, postsRouter);
router.use("/authors", authMiddleware, authorRouter);

export default router;