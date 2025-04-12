import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const loggedUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId)
    .select("-_id -password -refreshToken -createdAt -updatedAt -__v")
    .lean();

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found."));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "Logged user data retrieved successfully."
    )
  );
});

export { loggedUser };
