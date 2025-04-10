import { model, Schema } from "mongoose";

const sakshamResponseSchema = new Schema(
  {
    trainingAttended: { type: Boolean, required: true },

    businessStarted: { type: Boolean, required: true },
    businessDetails: {
      startDate: { type: Date },
      isRegistered: { type: Boolean },
      registeredName: { type: String },
      registrationDate: { type: Date },
      sector: { type: String },
      productsOrServices: [{ type: String }],
      totalPeopleEmployed: { type: Number },
    },

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
            enum: ["Bank", "Private", "Government", "Others"],
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