import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import { userProfileDataValidationSchema } from "../../utils/helper/validations/profileValidationSchema.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";

const updateProfile = asyncHandler(async (req, res) => {
  try {
    console.log("req body", req.body);

    const validatedData = await userProfileDataValidationSchema.validateAsync(
      req.body
    );

    console.log("validated ", validatedData);
    const userId = req.user._id; // Access user _id from JWT

    // // Prepare updated data for fields that are allowed to be changed
    // const updatedData = { ...validatedData };

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found."));
    }

    // Check email is already used by another user
    if (validatedData.email) {
      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              { inputEmail: validatedData.email },
              "Email is already in use by another user."
            )
          );
      }
    }

    // Prepare final updatedData while checking for empty values
    const updatedData = {
      name: validatedData.name || user.name,
      age: validatedData.age || user.age,
      dob: validatedData.dob || user.dob,
      phone: validatedData.phone ? `+91${validatedData.phone}` : user.phone,
      email: validatedData.email || user.email,
      address:validatedData.address || user.address,
      gender: validatedData.gender || user.gender,
      caste: validatedData.caste || user.caste,
      category: validatedData.category || user.category,
      highestEducation: validatedData.highestEducation || user.highestEducation,
      primaryOccupation: validatedData.primaryOccupation || user.primaryOccupation,
      monthlyIncome: validatedData.monthlyIncome || user.monthlyIncome,
      pan: validatedData.pan || user.pan,
      adhaar: validatedData.adhaar || user.adhaar,
      registrationReason: validatedData.registrationReason || user.registrationReason,
    };

    // Remove undefined or empty values (ensuring no accidental overrides)
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === "" || updatedData[key] === null) {
        updatedData[key] = user[key]; // Retain previous value
      }
    });

    // update user profile
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updatedData,
      {
        new: true, // Return the updated user document
      }
    ).select("-password -refreshToken");

    console.log("Final Updated Data:", updatedData);

    if (!updatedUser) {
      throw new ApiError(500, "Failed to update profile in db.");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          updatedUser: {
            ...updatedUser.toObject(),
          },
        },
        "Profile updated successfully!"
      )
    );
  } catch (error) {
    if (error.isJoi) {
      // Handle JOI validation errors
      return res
        .status(400)
        .json(new ApiResponse(400, {}, `Validation Error: ${error.message}`));
    }

    throw new ApiError(500, `Error: ${error.message}`);
  }
});

export { updateProfile };
