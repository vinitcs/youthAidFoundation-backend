import { Mentorship } from "../../models/mentorship.model.js";
import { MentorshipApplication } from "../../models/mentorshipApplication.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const applyForMentorship = asyncHandler(async (req, res) => {
  const { mentorshipId } = req.body;
  const userId = req.user._id;

  const mentorship = await Mentorship.findById(mentorshipId);
  if (!mentorship) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, "No mentorship found.")
      );
  }

  const alreadyApplied = await MentorshipApplication.findOne({
    userId,
    mentorshipId,
  });

  if (alreadyApplied) {
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "Already applied for this mentorship."));
  }

  const newApplication = await MentorshipApplication.create({
    userId,
    mentorshipId,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { data: newApplication },
        "Apply for mentorship successfully."
      )
    );
});

export { applyForMentorship };
