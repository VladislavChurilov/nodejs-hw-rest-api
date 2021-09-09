const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constans");

const schemaCreateUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: 400,
      message: `Not valid data`,
    });
  }
  next();
};

module.exports.createUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

module.exports.loginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};

module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).join({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "field of avatar with file not found",
    });
  }
  next();
};
