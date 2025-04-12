import { Mentorship } from "../../models/mentorship.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const getAllMentorShip = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query; // status optional: "Pending", "Accepted", "Rejected"

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const skip = (pageNum - 1) * limitNum;

  let filter = {};
  if (status) {
    filter.status = status;
  }

  const allMentorships = await Mentorship.find(filter)
    .populate("userId", "name email avatar")
    .skip(skip)
    .limit(limitNum)
    .lean();

  if (!allMentorships || !allMentorships.length) {
    const message =
      pageNum === 1
        ? `No requested mentorship found.`
        : "No more requested mentorship data available.";

    return res
      .status(200)
      .json(new ApiResponse(200, { requestedMentorships: [] }, message));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { requestedMentorships: allMentorships },
        "All requested mentorships fetch successfully."
      )
    );
});

export { getAllMentorShip };
