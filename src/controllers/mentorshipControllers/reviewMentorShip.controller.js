import { Mentorship } from "../../models/mentorship.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const reviewMentorShip = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // should be either "Accepted" or "Rejected"

  if (!["Accepted", "Rejected"].includes(status)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid status"));
  }

  const mentorship = await Mentorship.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!mentorship) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Mentorship request not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, `Mentorship status has been set to ${status}`)
    );
});

export { reviewMentorShip };
