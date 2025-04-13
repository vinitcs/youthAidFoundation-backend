import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { SankalpResponse } from "../../models/sankalpResponse.model.js";
import { SakshamResponse } from "../../models/sakshamResponse.model.js";
import { SphoortyResponse } from "../../models/sphoortyResponse.model.js";

const getStageResponseDetails = asyncHandler(async (req, res) => {
  const { stageName, id } = req.params;

  let Model;
  if (stageName === "Sankalp") Model = SankalpResponse;
  else if (stageName === "Saksham") Model = SakshamResponse;
  else if (stageName === "Sphoorty") Model = SphoortyResponse;
  else return res.status(400).json(new ApiResponse(400, {}, "Invalid stage"));

  const response = await Model.findById(id)
    .populate("userId", "name email avatar")
    .lean();

  if (!response) {
    return res.status(404).json(new ApiResponse(404, {}, "Response not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Response details fetched"));
});

export { getStageResponseDetails };
