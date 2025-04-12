import { model, Schema } from "mongoose";

const sakshamResponseSchema = new Schema(
  {
    trainingAttended: { type: Boolean, required: true },

    trainingAttendedLocation: { type: String, default: "" },

    businessStarted: { type: Boolean, required: true },

    businessDetails: {
      startDate: { type: Date },
      isRegistered: { type: Boolean },
      registeredName: { type: String },
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

    productsOrServices: [{ type: String }],

    totalPeopleEmployed: { type: Number },

    financials: {
      totalInvestment: { type: Number }, // in assets/plant/machinery
      incomeAndExpenditure: [
        {
          month: { type: String }, // format: "YYYY-MM"
          income: { type: Number },
          expenditure: { type: Number },
        },
      ],

      loanStatus: {
        hasLoan: { type: Boolean },
        loanDetails: {
          dateOfLoan: { type: Date },
          loanAmount: { type: Number },
          instalmentAmount: { type: Number },
          repaymentPeriod: { type: String },
          loanType: {
            type: String,
            enum: ["bank", "private", "government", "others"],
          },
        },
      },
      otherFinancialSupport: { type: String }, // e.g., Govt. Grant / Award
      audited: { type: Boolean },
    },

    registeredWithYEFI: { type: Boolean },
    yeSummitAttended: { type: Boolean },
    mentorName: { type: String },
  },
  {
    timestamps: true,
  }
);

export const SakshamResponse = model("SakshamResponse", sakshamResponseSchema);
