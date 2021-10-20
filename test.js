import Joi from "joi";
import joiToMd from "./main.js";

//Example JOI Schema
const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .description("The username, can't get much simpler than that."),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .description("The password for the user's account."),
  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(2021)
    .required()
    .description("The year the user was born."),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional()
    .description("The user's email address"),
  siblings: Joi.array().items(
    Joi.object({
      name: Joi.string().description("The name of the sibling"),
      birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2021)
        .description("The year the sibling was born"),
    })
  ),
})
  .with("username", "birth_year")
  .xor("password", "access_token")
  .with("password", "repeat_password");

console.log(joiToMd(schema));
