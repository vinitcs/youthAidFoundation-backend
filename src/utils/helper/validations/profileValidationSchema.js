import Joi from "joi";

const userProfileDataValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).allow(null, "").optional().messages({
    "string.base": "Name must be a string.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 100 characters.",
    // "string.empty": "Name is required.",
  }),

  age: Joi.number().required().messages({
    "any.required": "Age is required.",
  }),

  dob: Joi.string().required().messages({
    "any.required": "DOB is required.",
  }),

  phone: Joi.string().required().messages({
    "any.required": "Phone is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),

  address: Joi.object({
    city: Joi.string().min(2).max(40).allow("").optional().messages({
      "string.base": "City must be a string.",
    }),
    district: Joi.string().min(2).max(40).allow("").optional().messages({
      "string.base": "District must be a string.",
    }),
    state: Joi.string().min(2).max(40).allow("").optional().messages({
      "string.base": "State must be a string.",
    }),
    pinCode: Joi.string().min(2).max(40).allow("").optional().messages({
      "string.base": "pinCode must be a string.",
    }),
    country: Joi.string().min(2).max(40).allow("").optional().messages({
      "string.base": "Country must be a string.",
    }),
  })
    .required()
    .messages({
      "any.required": "Address is required.",
    }),

  gender: Joi.string().required().messages({
    "any.required": "Gender is required.",
  }),

  caste: Joi.string().required().messages({
    "any.required": "caste is required.",
  }),

  category: Joi.string().optional().messages({
    // "any.required": "caste is required.",
  }),

  highestEducation: Joi.string().required().messages({
    "any.required": "Highest education is required.",
  }),

  primaryOccupation: Joi.string().required().messages({
    "any.required": "Primary Occupation is required.",
  }),

  monthlyIncome: Joi.number().required().messages({
    "any.required": "Monthly income is required.",
  }),

  pan: Joi.string().required().messages({
    "any.required": "Pan is required.",
  }),

  adhaar: Joi.string().required().messages({
    "any.required": "Adhaar is required.",
  }),

  registrationReasonSchema: Joi.object({
    becomeYefiMember: Joi.boolean().default(false),
    attendTraining: Joi.boolean().default(false),
    startBusiness: Joi.boolean().default(false),
    joinVolunteer: Joi.boolean().default(false),
    joinMentor: Joi.boolean().default(false),
    startInitiative: Joi.boolean().default(false),
  }),
});

const adminProfileDataValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).allow(null, "").optional().messages({
    "string.base": "Name must be a string.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 100 characters.",
    // "string.empty": "Name is required.",
  }),

  email: Joi.string().email().allow(null, "").optional().messages({
    "string.email": "Please enter a valid email address.",
    // "string.empty": "Email is required.",
  }),
});

export { userProfileDataValidationSchema, adminProfileDataValidationSchema };
