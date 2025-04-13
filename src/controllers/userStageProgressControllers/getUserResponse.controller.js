import { SakshamResponse } from "../../models/sakshamResponse.model.js";
import { SankalpResponse } from "../../models/sankalpResponse.model.js";
import { SphoortyResponse } from "../../models/sphoortyResponse.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const getUserResponses = asyncHandler(async (req, res) => {
  const {
    stageName, // <-- Required
    search = "",
    status,
    page = 1,
    limit = 10,
    sortByStatus,
  } = req.query;

  if (!stageName || !["Sankalp", "Saksham", "Sphoorty"].includes(stageName)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid or missing stage name."));
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;
  const regex = new RegExp(search, "i");

  // Dynamically select model based on stage
  let Model;
  switch (stageName) {
    case "Sankalp":
      Model = SankalpResponse;
      break;
    case "Saksham":
      Model = SakshamResponse;
      break;
    case "Sphoorty":
      Model = SphoortyResponse;
      break;
  }

  const aggregationPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    {
      $match: {
        ...(status && { status }),
        ...(search && {
          $or: [{ "user.name": regex }, { "user.email": regex }],
        }),
      },
    },

    {
      $addFields: {
        statusOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$status", "Pending"] }, then: 1 },
              { case: { $eq: ["$status", "Accepted"] }, then: 2 },
              { case: { $eq: ["$status", "Rejected"] }, then: 3 },
            ],
            default: 4,
          },
        },
      },
    },

    {
      $sort:
        sortByStatus === "true"
          ? { statusOrder: 1, createdAt: -1 }
          : { createdAt: -1 },
    },

    { $skip: skip },
    { $limit: limitNum },

    {
      $project: {
        _id: 1,
        userId: "$user._id",
        userName: "$user.name",
        userEmail: "$user.email",
        selectedLists: 1,
        isCompleted: 1,
        status: 1,
        adminRemarks: 1,
        createdAt: 1,
        stageName: stageName,
      },
    },
  ];

  const responses = await Model.aggregate(aggregationPipeline);
  const total = await Model.countDocuments(
    status
      ? {
          status,
          ...(search && {
            $or: [{ "user.name": regex }, { "user.email": regex }],
          }),
        }
      : {}
  );

  const message =
    responses.length === 0
      ? pageNum === 1
        ? "No responses."
        : "No more responses available."
      : "User responses fetched successfully.";

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        total,
        page: pageNum,
        limit: limitNum,
        responses,
      },
      message
    )
  );
});

export { getUserResponses };
