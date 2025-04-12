// import { AccessToken } from "../../models/accessToken.model.js";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import { generateAccessAndRefreshToken } from "../../utils/helper/generateAccessAndRefreshToken.js";
import { signUpUserValidationSchema } from "../../utils/helper/validations/userValidationSchema.js";

const signUp = asyncHandler(async (req, res) => {
  try {
    // const { otp, ...validBody } = req.body; // Exclude otp from validation
    // console.log("...validBody", validBody);

    const { userData } = req.body;

    const {
      name,
      age,
      dob,
      phone,
      email,
      address,
      city,
      pinCode,
      district,
      state,
      country,
      gender,
      caste,
      category,
      heightEducation,
      primaryOccupation,
      monthlyIncome,
      pan,
      adhaar,
      registrationReason,
      password,
    } = await signUpUserValidationSchema.validateAsync(userData);

    // Check if user already exists
    const existedUser = await User.findOne({ email: email });

    if (existedUser) {
      return res
        .status(409)
        .json(
          new ApiResponse(
            409,
            { email: email },
            `User with email already exists.`
          )
        );
    }

    // Create user
    const user = await User.create({
      name: name,
      age: age,
      dob: dob,
      phone: `+91${phone}`,
      email: email,
      address: address,
      city: city,
      pinCode: pinCode,
      district: district,
      state: state,
      country: country,
      gender: gender,
      caste: caste,
      category: category,
      heightEducation: heightEducation,
      primaryOccupation: primaryOccupation,
      monthlyIncome: monthlyIncome,
      pan: pan,
      adhaar: adhaar,
      registrationReason: registrationReason,
      password: password,
    });

    if (!user || user.length === 0) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // // create the corressponding document to store accessToken on db under accessToken model
    // const accessTokenResult = await AccessToken.create({
    //   userId: user._id,
    //   token: accessToken,
    // });

    // if (!accessTokenResult || accessTokenResult.length === 0) {
    //   throw new ApiError(
    //     500,
    //     "Something went wrong while storing access token in db"
    //   );
    // }

    // store refresh token in user model
    user.refreshToken = refreshToken;
    const updateUserRefreshToken = await user.save();

    if (!updateUserRefreshToken || updateUserRefreshToken.length === 0) {
      throw new ApiError(
        500,
        "Something went wrong while storing refresh token in db"
      );
    }

    // const options = {
    //   httpOnly: true,
    //   secure: true, // Ensures the cookie is only sent over HTTPS
    //   sameSite: "None", // Allows the cookie to be sent in cross-origin requests (important for mobile apps)
    //   maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time
    // };

    return (
      res
        .status(200)
        // .cookie("accessToken", accessToken, options)
        .json(
          new ApiResponse(
            200,
            // {},
            { accessToken, refreshToken, accessTokenExpiresIn: 60 * 60 * 24 }, //Access Token expiration time (1 day),
            "Sign up successfully."
          )
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

export { signUp };
