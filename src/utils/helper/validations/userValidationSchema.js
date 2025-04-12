import Joi from "joi";

// During verify OTP middleware
const verifyOtpValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),

  otp: Joi.string()
    .length(6)
    .pattern(/^\d+$/) // Ensures it's numeric
    .required()
    .messages({
      "string.length": "OTP must be exactly 6 digits.",
      "string.pattern.base": "OTP must only contain numbers.",
      "string.empty": "OTP is required.",
    }),

  userType: Joi.string().valid("admin", "user").required(),
});

// During signUp/ register
const signUpUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name must be a string.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 100 characters.",
    "any.required": "Name is required.",
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
  }).optional(),

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

  registrationReason: Joi.object({
    becomeYefiMember: Joi.boolean().default(false),
    attendTraining: Joi.boolean().default(false),
    startBusiness: Joi.boolean().default(false),
    joinVolunteer: Joi.boolean().default(false),
    joinMentor: Joi.boolean().default(false),
    startInitiative: Joi.boolean().default(false),
  }),

  password: Joi.string().required(),
});

// During Login
const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().required(),
});

export {
  verifyOtpValidationSchema,
  signUpUserValidationSchema,
  loginUserValidationSchema,
};

//
//
//
//
//
//
//
//
//
// gender: Joi.string().required().messages({
//   "any.required": "Gender is required.",
// }),

// caste: Joi.string().required().messages({
//   "any.required": "caste is required.",
// }),

// religion: Joi.string().required().messages({
//   "any.required": "Religion is required.",
// }),

// bloodGroup: Joi.string().required().messages({
//   "any.required": "Blood Group is required.",
// }),

// education: Joi.string().required().messages({
//   "any.required": "Education is required.",
// }),

// college: Joi.string().required().messages({
//   "any.required": "College is required.",
// }),
