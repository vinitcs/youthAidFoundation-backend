import { model, Schema, Types } from "mongoose";

const sphoortyResponseSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },

    startupMeetingAttended: { type: Boolean, required: true },

    registeredBusinessName: { type: String, default: "" },

    businessStructure: {
      type: String,
      enum: ["Sole Proprietorship", "Partnership", "LLP"],
      default: "",
    },

    sector: {
      greenEntrepreneurship: { type: Boolean, default: false },
      technologyAndInnovation: { type: Boolean, default: false },
      agriTech: { type: Boolean, default: false },
      microBusiness: { type: Boolean, default: false },
      garmentsAndFashion: { type: Boolean, default: false },
      foodAndTechnology: { type: Boolean, default: false },
      hospitalityAndTourism: { type: Boolean, default: false },
      socialImpactIdeas: { type: Boolean, default: false },
    },

    businessProductsOrServices: [{ type: String, default: "" }],

    numberOfPeopleEmployed: { type: Number },

    annualTurnover: { type: Number },

    annualAuditCompleted: { type: Boolean },

    attendedAcceleratorProgram: { type: Boolean },

    loanStatus: {
      hasLoan: { type: Boolean, default: false },
      loanDetails: {
        loanType: {
          type: String,
          enum: ["bank", "private", "government", "others"],
          default: "",
        },
        dateOfLoan: { type: Date },
        loanAmount: { type: Number },
        instalmentAmount: { type: Number },
        instalmentFrequency: {
          type: String,
          enum: ["monthly", "quarterly", "annually"],
          default: "",
        },
        repaymentPeriod: { type: String, default: "" },
      },
    },

    otherFinancialSupport: { type: String, default: "" }, // Govt. Grant / Award

    receivedBusinessRecognition: { type: Boolean },

    mentorAllocated: { type: String, default: "" },

    registeredWithYEFI: { type: Boolean },

    media: [
      {
        url: { type: String, trim: true, default: "" },
        type: {
          type: String,
          enum: ["image", "pdf"],
          default: "",
        },
        link: { type: String, trim: true, default: "" },
      },
    ],

    // Admin side acceptance or rejection
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const SphoortyResponse = model(
  "SphoortyResponse",
  sphoortyResponseSchema
);
