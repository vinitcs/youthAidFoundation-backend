import { MentorshipApplication } from "../../models/mentorshipApplication.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const acceptRequestMentorShip = asyncHandler(async (req, res) => {
  const { mentorshipId } = req.params;
  const { status } = req.body; // should be either "Accepted" or "Rejected"

  if (!["Accepted", "Rejected"].includes(status)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid status."));
  }

  const acceptMentorship = await MentorshipApplication.findByIdAndUpdate(
    mentorshipId,
    { status },
    { new: true }
  );

  if (!acceptMentorship) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, {}, "Mentorship application request not found.")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        `Mentorship application status of user has been set to ${status}`
      )
    );
});

export { acceptRequestMentorShip };
