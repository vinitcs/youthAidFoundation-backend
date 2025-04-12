import { Mentorship } from "../../models/mentorship.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const displayAcceptedMentorship = asyncHandler(async (req, res) => {
  // const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const skip = (pageNum - 1) * limitNum;

  const displayAcceptedMentorshipData = await Mentorship.find({
    status: "Accepted",
  })
    .skip(skip)
    .limit(limitNum)
    .lean();

  if (!displayAcceptedMentorshipData || !displayAcceptedMentorshipData.length) {
    const message =
      pageNum === 1
        ? `No display mentorship found.`
        : "No more display mentorship data available.";

    return res
      .status(200)
      .json(new ApiResponse(200, { displayMentorships: [] }, message));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { displayMentorships: [] },
        "Display mentorship list fetched successfully."
      )
    );
});

export { displayAcceptedMentorship };
