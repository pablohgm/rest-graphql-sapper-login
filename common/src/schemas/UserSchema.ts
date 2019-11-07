import * as Joi from '@hapi/joi'

const UserSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(/^.{8,}$/, 'The password should have minimum eight characters')
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
})

export default UserSchema
