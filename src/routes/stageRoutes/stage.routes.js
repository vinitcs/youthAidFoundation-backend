import { Router } from "express";
import { verifyJWT } from "../../middlewares/userAuth.middleware.js";

const router = Router();

router.route("/submit").post(verifyJWT);

export default router;
