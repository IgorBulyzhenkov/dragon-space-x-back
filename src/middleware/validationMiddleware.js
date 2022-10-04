const Joi = require("joi");

module.exports = {
  validateAuth: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net","ru","ua"] },
        })
        .required(),
      password: Joi.string().alphanum().min(7).max(15).required(),
    });

    const validateBody = schema.validate(req.body);
    const { error } = validateBody;
    if (error) {
      return res
        .status(400)
        .json({ message: `${error.message}` });
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
      return res.status(400).json({ message: `${error.message}` });
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
      return res.status(400).json({ message: `${error.message}` });
    }

    next();
  },
};
