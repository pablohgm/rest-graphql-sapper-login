import * as Joi from '@hapi/joi'

const LoginSchema = Joi.object({
  password: Joi.string().required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
})

export default LoginSchema
