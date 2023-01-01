//validation
const Joi = require("@hapi/joi");

//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(10).max(25).required(),
    password: Joi.string().min(8).max(50).required(),
  });
  return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(10).max(25).required(),
    password: Joi.string().min(8).max(50).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
