import { model, Schema, Types } from "mongoose";

const mentorshipApplicationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentorshipId: {
      type: Types.ObjectId,
      ref: "Mentorship",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

mentorshipApplicationSchema.index(
  { userId: 1, mentorshipId: 1 },
  { unique: true }
); // prevent duplicate applications

export const MentorshipApplication = model(
  "MentorshipApplication",
  mentorshipApplicationSchema
);
