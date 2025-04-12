import { MentorshipApplication } from "../../models/mentorshipApplication.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const requestingListMentorship = asyncHandler(async (req, res) => {
  const { mentorshipId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const skip = (pageNum - 1) * limitNum;

  const applications = await MentorshipApplication.find({
    mentorshipId,
  })
    .populate("userId", "name email avatar")
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip(skip)
    .limit(limitNum)
    .lean();

  if (!applications || !applications.length) {
    const message =
      pageNum === 1
        ? `No requesting users list for mentorship found.`
        : "No more requesting users list for mentorship data available.";

    return res
      .status(200)
      .json(new ApiResponse(200, { requestingUsers: [] }, message));
  }

  return res.json(
    new ApiResponse(
      200,
      { requestingUsers: applications },
      "Successfully fetched requesting users list for mentorship."
    )
  );
});

export { requestingListMentorship };
