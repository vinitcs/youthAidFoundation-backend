import { Mentorship } from "../../models/mentorship.model.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const displayMentorshipUserSide = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const mentorships = await Mentorship.aggregate([
    // Sort latest first
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitNum },

    // Join admin data and select only name, email, and avatar
    {
      $lookup: {
        from: "admins",
        localField: "adminId",
        foreignField: "_id",
        as: "adminId",
        pipeline: [
          {
            $project: {
              name: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$adminId",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Join applications of logged-in user only
    {
      $lookup: {
        from: "mentorshipapplications",
        let: { mentorshipId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$mentorshipId", "$$mentorshipId"] },
                  { $eq: ["$userId", userId] },
                ],
              },
            },
          },
        ],
        as: "userApplication",
      },
    },

    // Add flag if user applied
    {
      $addFields: {
        isLoggedUserRequested: {
          $gt: [{ $size: "$userApplication" }, 0],
        },
      },
    },

    // Remove `userApplication` field from response
    {
      $project: {
        userApplication: 0,
      },
    },
  ]);

  const message =
    mentorships.length === 0
      ? pageNum === 1
        ? "No display mentorship found."
        : "No more display mentorship data available."
      : "Display mentorship list fetched successfully.";

  return res
    .status(200)
    .json(new ApiResponse(200, { displayMentorships: mentorships }, message));
});

export { displayMentorshipUserSide };


//
//
//
//
//
//
//
//
//

// const displayMentorshipUserSide = asyncHandler(async (req, res) => {
//   // const userId = req.user._id;
//   const { page = 1, limit = 10 } = req.query;

//   const pageNum = Number(page) || 1;
//   const limitNum = Number(limit) || 10;

//   const skip = (pageNum - 1) * limitNum;

//   const displayMentorshipUserSideData = await Mentorship.find({})
//     .populate("adminId", "name email avatar")
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limitNum)
//     .lean();

//   if (!displayMentorshipUserSideData || !displayMentorshipUserSideData.length) {
//     const message =
//       pageNum === 1
//         ? `No display mentorship found.`
//         : "No more display mentorship data available.";

//     return res
//       .status(200)
//       .json(new ApiResponse(200, { displayMentorships: [] }, message));
//   }

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         { displayMentorships: displayMentorshipUserSideData },
//         "Display mentorship list fetched successfully."
//       )
//     );
// });
