import Joi from "joi";

// Regex to validate YYYY-MM format
const monthFormatRegex = /^\d{4}-(0[1-9]|1[0-2])$/;

export const sakshamResponseValidationSchema = Joi.object({
  trainingAttended: Joi.boolean().required(),

  trainingAttendedLocation: Joi.string().allow(""),

  businessStarted: Joi.boolean().required(),

  businessDetails: Joi.object({
    startDate: Joi.date().optional(),
    isRegistered: Joi.boolean().optional(),
    registeredName: Joi.string().allow("").optional(),
    registrationDate: Joi.date().optional(),
  }).optional(),

  sector: Joi.object({
    greenEntrepreneurship: Joi.boolean().default(false),
    technologyAndInnovation: Joi.boolean().default(false),
    agriTech: Joi.boolean().default(false),
    microBusiness: Joi.boolean().default(false),
    garmentsAndFashion: Joi.boolean().default(false),
    foodAndTechnology: Joi.boolean().default(false),
    hospitalityAndTourism: Joi.boolean().default(false),
    socialImpactIdeas: Joi.boolean().default(false),
  }).optional(),

  productsOrServices: Joi.array().items(Joi.string()).optional(),

  totalPeopleEmployed: Joi.number().integer().optional(),

  financials: Joi.object({
    totalInvestment: Joi.number().optional(),

    incomeAndExpenditure: Joi.array()
      .items(
        Joi.object({
          month: Joi.string().regex(monthFormatRegex).optional(), // YYYY-MM
          income: Joi.number().optional(),
          expenditure: Joi.number().optional(),
        })
      )
      .optional(),

    loanStatus: Joi.object({
      hasLoan: Joi.boolean().optional(),
      loanDetails: Joi.object({
        dateOfLoan: Joi.date().optional(),
        loanAmount: Joi.number().optional(),
        instalmentAmount: Joi.number().optional(),
        repaymentPeriod: Joi.string().allow("").optional(),
        loanType: Joi.string()
          .valid("bank", "private", "government", "others")
          .allow("")
          .optional(),
      }).optional(),
    }).optional(),

    otherFinancialSupport: Joi.string().allow("").optional(),
    audited: Joi.boolean().optional(),
  }).optional(),

  yeSummitAttended: Joi.boolean().optional(),

  mentorName: Joi.string().allow("").optional(),

  //   media: Joi.array().items(
  //     Joi.object({
  //       url: Joi.string().uri().allow(""),
  //       type: Joi.string().valid("image", "pdf").allow(""),
  //       link: Joi.string().uri().allow(""),
  //     })
  //   ).optional(),

  //   status: Joi.string()
  //     .valid("Pending", "Accepted", "Rejected")
  //     .default("Pending")
  //     .optional(),
});
