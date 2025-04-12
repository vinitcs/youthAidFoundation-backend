import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      trim: true,
      default: "",
    },

    age: {
      type: Number,
      default: 0,
    },

    dob: {
      type: Date,
      default: null,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String, // added new field
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    pinCode: {
      type: String,
      trim: true,
    },

    district: {
      type: String, // added new field
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String, // added new field
      trim: true,
    },

    gender: {
      type: String,
      trim: true,
    },

    caste: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    heightEducation: {
      type: String,
      trim: true,
    },

    primaryOccupation: {
      type: String,
      trim: true,
    },

    monthlyIncome: {
      type: Number,
      default: 0,
    },

    pan: {
      type: String, // added new field
      trim: true,
    },

    adhaar: {
      type: String, // added new field
      trim: true,
    },

    registrationReason: {
      becomeYefiMember: { type: Boolean, default: false },
      attendTraining: { type: Boolean, default: false },
      startBusiness: { type: Boolean, default: false },
      joinVolunteer: { type: Boolean, default: false },
      joinMentor: { type: Boolean, default: false },
      startInitiative: { type: Boolean, default: false },
    },

    avatar: {
      // Profile Img URl
      type: String,
      trim: true,
      default: "",
    },

    password: {
      type: String,
      required: [true, "Please enter user password"],
      trim: true,
    },

    refreshToken: {
      type: String, // Refresh token is stored securely
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      phone: this.phone,
    },
    process.env.USER_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.USER_ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      phone: this.phone,
    },
    process.env.USER_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.USER_REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = model("User", userSchema);

//
//
//
//
//
//
//
//
// gender: {
//   type: String,
//   required: true,
// },

// caste: {
//   type: String,
//   required: true,
// },

// religion: {
//   type: String,
//   reuired: true,
// },

// bloodGroup: {
//   type: String,
//   required: true,
// },

// education: {
//   type: String,
//   required: true,
// },

// college: {
//   type: String,
//   required: true,
// },

// bio: {
//   type: String,
//   trim: true,
//   default: "",
// },
