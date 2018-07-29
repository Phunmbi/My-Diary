// Built working with the tutorial from https://www.youtube.com/watch?v=XFpV8b5937M
// Regex to replace multiple whitespace with single white space is from https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
import Joi from 'joi';

const schemas = Joi.object().keys({
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
});

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