const Joi = require('joi');

const newPassword = Joi.string().min(8);
const token = Joi.string();


const createRecoverySchema = Joi.object({
  newPassword: newPassword.required(),
  token: token.required()
});

module.exports = { createRecoverySchema }
