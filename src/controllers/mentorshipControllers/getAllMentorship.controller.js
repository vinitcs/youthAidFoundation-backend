import { Mentorship } from "../../models/mentorship.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const getAllMentorShip = asyncHandler(async (req, res) => {
  const { status } = req.query; // optional: "Pending", "Accepted", "Rejected"

  let filter = {};
  if (status) {
    filter.status = status;
  }

  const allMentorships = await Mentorship.find(filter).populate(
    "userId",
    "name email avatar"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: allMentorships },
        "All mentorships fetch successfully."
      )
    );
});

export { getAllMentorShip };
