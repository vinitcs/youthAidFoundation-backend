import { Notification } from "../../models/notification.model.js";
import { User } from "../../models/user.model.js";
import { UserAchievement } from "../../models/UserAchievement.model.js";
import { SakshamResponse } from "../../models/sakshamResponse.model.js";
import { SankalpResponse } from "../../models/sankalpResponse.model.js";
import { SphoortyResponse } from "../../models/sphoortyResponse.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import { generateCertificate } from "../../utils/helper/template/generateCertificate.js";

const modelMap = {
  Saksham: SakshamResponse,
  Sankalp: SankalpResponse,
  Sphoorty: SphoortyResponse,
};

const reviewUserStage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  const { stageName, responseId, status, adminRemarks } = req.body;

  if (!["Accepted", "Rejected"].includes(status)) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "Invalid status. Use 'Accepted' or 'Rejected'."
        )
      );
  }

  const StageModel = modelMap[stageName];
  if (!StageModel) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid stage name."));
  }

  const stageResponse = await StageModel.findById(responseId);
  if (!stageResponse) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Stage response not found."));
  }

  stageResponse.status = status;
  stageResponse.adminRemarks = adminRemarks || "";
  await stageResponse.save();

  // Notify user
  await Notification.create({
    type: "AdminReview",
    sharedByAdminName: admin.name,
    sharedToUserId: stageResponse.userId,
    message: `Your ${stageName} submission has been ${status.toLowerCase()} by the admin.`,
  });

  // Generate certificate only if accepted
  if (status === "Accepted") {
    const user = await User.findById(stageResponse.userId).select("name");

    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const resultPath = await generateCertificate({
      name: user.name,
      stage: stageName,
      date: formattedDate,
      remark: "Excellent performance and teamwork",
    });

    await UserAchievement.create({
      adminId: admin._id,
      userId: stageResponse.userId,
      url: resultPath,
      type: "pdf",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        `Submission ${status.toLowerCase()} successfully.`
      )
    );
});

export { reviewUserStage };
