import { Mentorship } from "../../models/mentorship.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const createMentorShip = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { businessExpertise, experience, mode, location, day, date, time } =
    req.body;

  const newMentorship = await Mentorship.create({
    userId: userId,
    businessExpertise,
    experience,
    mode,
    location,
    day,
    date,
    time,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { success: true, data: newMentorship },
        "Request for mentorship successfully placed. Admin will review and you will get notify."
      )
    );
});

export { createMentorShip };
