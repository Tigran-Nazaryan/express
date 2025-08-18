import express from "express";
import { login, logout, refresh, registration, verify} from "../../controllers/auth/index.js";
import authMiddleware from "../../middleware/auth-middleware.js";

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/verify", authMiddleware, verify);

export default router;
