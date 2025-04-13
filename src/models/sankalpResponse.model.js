import { model, Schema, Types } from "mongoose";

const sankalpResponseSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },

    trainingAttended: { type: Boolean, required: true },

    trainingAttendedLocation: { type: String, default: "" },

    //     businessStarted: { type: Boolean, required: true },

    businessDetails: {
      startDate: { type: Date },
      //  isRegistered: { type: Boolean },
      registeredName: { type: String, default: "" },
      registrationDate: { type: Date },
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

    productsOrServices: [{ type: String, default: "" }],

    totalPeopleEmployed: { type: Number },

    financials: {
      totalInvestment: { type: Number }, // in assets/plant/machinery
      incomeAndExpenditure: [
        {
          month: { type: String, default: "" }, // format: "YYYY-MM"
          income: { type: Number },
          expenditure: { type: Number },
        },
      ],

      loanStatus: {
        //    hasLoan: { type: Boolean },
        loanDetails: {
          dateOfLoan: { type: Date },
          loanAmount: { type: Number },
          instalmentAmount: { type: Number },
          repaymentPeriod: { type: String, default: "" },
          loanType: {
            type: String,
            // enum: ["bank", "private", "government", "others"],
            default: "",
          },
        },
      },
      otherFinancialSupport: { type: String, default: "" }, // e.g., Govt. Grant / Award
      audited: { type: Boolean },
      wantsAuditSupport: { type: Boolean },
    },

    yeSummitAttended: { type: Boolean },
    mentorName: { type: String, default: "" },
    receivedBusinessRecognition: { type: Boolean },
    registeredWithYEFI: { type: Boolean },
    membershipFeePaid: { type: Boolean },

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

    // Admin side acceptance or rejectance
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

export const SankalpResponse = model("SankalpResponse", sankalpResponseSchema);
