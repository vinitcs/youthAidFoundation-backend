import { Router } from "express";
import { verifyJWT } from "../../middlewares/userAuth.middleware.js";
import { displayMentorshipUserSide } from "../../controllers/mentorshipControllers/displayMentorshipUserSide.controller.js";
import { applyForMentorship } from "../../controllers/mentorshipControllers/applyForMentorship.controller.js";
import { appliedHistoryMentorship } from "../../controllers/mentorshipControllers/appliedHistoryMentorship.controller.js";

const router = Router();

router.route("/all").get(verifyJWT, displayMentorshipUserSide);

router.route("/apply").post(verifyJWT, applyForMentorship);

router.route("/history").get(verifyJWT, appliedHistoryMentorship);

export default router;
