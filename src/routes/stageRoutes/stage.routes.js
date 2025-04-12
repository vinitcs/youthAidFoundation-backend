import { Router } from "express";
import { verifyJWT } from "../../middlewares/userAuth.middleware.js";
import documentUpload from "../../utils/helper/multer/document.multer.js";
import { submitSakshamResponse } from "../../controllers/stageControllers/submitSakshamResponse.controller.js";
import { submitSankalpResponse } from "../../controllers/stageControllers/submitSankalpResponse.controller.js";
import { submitSphoortyResponse } from "../../controllers/stageControllers/submitSphoortyResponse.controller.js";

const router = Router();

router
  .route("/saksham/response/submit")
  .post(verifyJWT, documentUpload.array("media", 5), submitSakshamResponse);

router
  .route("/sankalp/response/submit")
  .post(verifyJWT, documentUpload.array("media", 5), submitSankalpResponse);

router
  .route("/sphoorty/response/submit")
  .post(verifyJWT, documentUpload.array("media", 5), submitSphoortyResponse);

export default router;
