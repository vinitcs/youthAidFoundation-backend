import { model, SchemaTypes, Types } from "mongoose";

const mentorshipSchema = new SchemaTypes(
  {
    adminId: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    businessExpertise: {
      type: String,
    },
    experience: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["online", "offline"],
    },
    location: {
      type: String,
    },
    day: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    // status: {
    //   type: String,
    //   enum: ["Pending", "Accepted", "Rejected"],
    //   default: "Pending",
    // },
  },
  {
    timestamps: true,
  }
);

export const Mentorship = model("Mentorship", mentorshipSchema);
