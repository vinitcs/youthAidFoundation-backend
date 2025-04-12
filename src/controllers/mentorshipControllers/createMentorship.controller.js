import { Mentorship } from "../../models/mentorship.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const createMentorShip = asyncHandler(async (req, res) => {
  const adminId = req.admin._id;
  const { businessExpertise, experience, mode, location, day, date, time } =
    req.body;

  const newMentorship = await Mentorship.create({
    adminId: adminId,
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
        { data: newMentorship },
        "Mentorship created successfully."
      )
    );
});

export { createMentorShip };
