import { SakshamResponse } from "../../models/sakshamResponse.model.js";
import { SankalpResponse } from "../../models/sankalpResponse.model.js";
import { SphoortyResponse } from "../../models/sphoortyResponse.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const allStageUserSide = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Define stage order manually
  const stageDefinitions = [
    { name: "Saksham", model: SakshamResponse },
    { name: "Sankalp", model: SankalpResponse },
    { name: "Sphoorty", model: SphoortyResponse },
  ];

  let isPreviousStageApproved = true;

  const stages = [];

  for (const stage of stageDefinitions) {
    // Get user's latest submission for this stage
    const submissions = await stage.model
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(1);

    const latest = submissions[0];

    const isSubmitted =
      !!latest &&
      (latest.status === "Pending" || latest.status === "Accepted");

    const isApproved = latest?.status === "Accepted";

    const isAccessible = isPreviousStageApproved;

    // Update for next loop
    isPreviousStageApproved = isApproved;

    stages.push({
      title: stage.name,
      isSubmitted,
      isApproved,
      isAccessible,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { stages },
      "Stages list fetched successfully with user progress."
    )
  );
});

export { allStageUserSide };
