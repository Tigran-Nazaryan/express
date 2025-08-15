import express from "express";
import {getUsers, login, logout, refresh, registration} from "../../controllers/auth/index.js";
import authMiddleware from "../../middleware/auth-middleware.js";

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/users", authMiddleware, getUsers);

export default router;
