import { MentorshipApplication } from "../../models/mentorshipApplication.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const appliedHistoryMentorship = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const skip = (pageNum - 1) * limitNum;

  const applications = await MentorshipApplication.find({ userId })
    .populate({
      path: "mentorshipId",
      populate: {
        path: "adminId",
        select: "name email avatar", // Add fields based on your Admin schema
      },
    })
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip(skip)
    .limit(limitNum)
    .lean();

  if (!applications || applications.length === 0) {
    const message =
      pageNum === 1
        ? `No history apply for mentorship found.`
        : "No more history apply for mentorship data available.";

    return res.status(200).json(new ApiResponse(200, { history: [] }, message));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { history: applications },
        "Successfully fetched history of apply in mentorships."
      )
    );
});

export { appliedHistoryMentorship };
