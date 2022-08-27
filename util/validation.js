import * as Joi from "joi";

const basicInformationSchema = Joi.object({
  country: Joi.object({
    name: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/), {})
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.base": `"Country" is a required field`,
        "string.empty": `"Country" must contain value`,
        "string.pattern.base": `"Country" must be alphabetic`,
        "any.required": `"Country" is a required field`,
      }),
    id: Joi.string().required(),
  }).messages({
    "object.base": `"Country" is a required field`,
  }),
  education: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/))
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": `"Education" is a required field`,
      "string.empty": `"Education" must contain value`,
      "string.pattern.base": `"Education" must be alphabetic`,
      "any.required": `"Education" is a required field`,
    }),

  experience: Joi.number().integer().min(0).max(30).required(),
});

export const basicInformationValidation = (basicInformation) =>
  basicInformationSchema.validate(basicInformation);

const personalDataSchema = Joi.object({
  fullName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/))
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": `"Full Name" should be a type of string`,
      "string.empty": `"Full Name" must contain value`,
      "string.pattern.base": `"Full Name" must be alphabetic`,
      "any.required": `"Full Name" is a required field`,
    }),
  phoneNumber: Joi.string()
    .pattern(new RegExp(/^[0-9]+$/))
    .required()
    .messages({
      "string.base": `"Phone Number" should be a type of string`,
      "string.empty": `"Phone Number" must contain value`,
      "string.pattern.base": `"Phone Number" must be digit number`,
      "any.required": `"Phone Number" is a required field`,
    }),
});

export const PersonalDataValidation = (personalData) =>
  personalDataSchema.validate(personalData);

const addCountrySchema = Joi.object({
  country: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/))
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": `"Country" should be a type of string`,
      "string.empty": `"Country" must contain value`,
      "string.pattern.base": `"Country" must be alphabetic`,
      "any.required": `"Country" is a required field`,
    }),
});

export const addCountryValidation = (obj) => addCountrySchema.validate(obj);
