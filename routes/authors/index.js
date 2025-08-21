import {Router} from "express";
import {getAuthorById} from "../../controllers/authors/index.js";

const router = Router();

router.get("/:id", getAuthorById);

export default router;