// Built working with the tutorial from https://www.youtube.com/watch?v=XFpV8b5937M
// Regex to replace multiple whitespace with single white space is from https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
import Joi from 'joi';

const schemas = {
  entries: Joi.object().keys({
    email: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .email()
      .max(20)
      .required(),
    title: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .max(200)
      .required(),
    details: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .max(10000)
      .required()
  }),
  userSignUp: Joi.object().keys({
    firstName: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .max(20)
      .lowercase()
      .required(),
    lastName: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .max(20)
      .lowercase()
      .required(),
    email: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .email()
      .lowercase()
      .max(40)
      .required(),
    password: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .max(200)
      .required()
  }),
  userLogIn: Joi.object().keys({
    email: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .email()
      .max(40)
      .lowercase()
      .required(),
    password: Joi.string()
      .replace(/  +/g, ' ')
      .trim()
      .max(200)
      .required()
  })
};

const validateEntry = (schema) => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }
    if (!req.value) { req.value = {}; }
    req.value.body = result.value;
    next();
  };
};

export { schemas, validateEntry };