const Joi = require("joi");
// const { ValidateError } = require("../helpers/errors");

module.exports = {
  validateAuth: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().alphanum().min(7).max(15).required(),
    });

    const validateBody = schema.validate(req.body);
    const { error } = validateBody;
    if (error) {
      return res
        .status(400)
        .json({ message: `missing required ${error} field` });
    }

    next();
  },
  validateLogin: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().alphanum().min(7).max(15).required(),
    });

    const validateBody = schema.validate(req.body);
    const { error } = validateBody;
    if (error) {
      return res
        .status(400)
        .json({ message: `missing required ${error} field` });
    }

    next();
  },
  validateVerify: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    });

    const validateBody = schema.validate(req.body);
    const { error } = validateBody;
    if (error) {
      return res
        .status(400)
        .json({ message: `missing required ${error} field` });
    }

    next();
  },
};
