import { Router } from "express";
import { verifyJWT } from "../../middlewares/userAuth.middleware.js";
import documentUpload from "../../utils/helper/multer/document.multer.js";
import { submitSakshamResponse } from "../../controllers/stageControllers/submitSakshamResponse.controller.js";

const router = Router();

router
  .route("/saksham/response/submit")
  .post(verifyJWT, documentUpload.array("media", 5), submitSakshamResponse);

export default router;
