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

  address: Joi.string().required().messages({
    "any.required": "Address is required.",
  }),

  city: Joi.string().required().messages({
    "any.required": "City is required.",
  }),

  pinCode: Joi.string().required().messages({
    "any.required": "Pin code is required.",
  }),

  district: Joi.string().required().messages({
    "any.required": "District is required.",
  }),

  state: Joi.string().required().messages({
    "any.required": "State is required.",
  }),

  country: Joi.string().required().messages({
    "any.required": "Country is required.",
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

  heightEducation: Joi.string().optional().messages({
    // "any.required": "caste is required.",
  }),

  primaryOccupation: Joi.string().optional().messages({
    // "any.required": "caste is required.",
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
