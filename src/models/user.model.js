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
      requied: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String, // added new field
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },

    district: {
      type: String, // added new field
      trim: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String, // added new field
      trim: true,
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
      type: [String], // e.g., ["Become a member", "Start business"] // added new field
      enum: [
        "Become a member",
        "Attend training",
        "Start business",
        "Join as volunteer",
        "Join as Mentor",
        "Start similar initiative",
      ],
      default: [],
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

// cast: {
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
