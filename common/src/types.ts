export interface IAuthentication {
  name?: string
  email?: string
  token?: string
  expiresIn?: string
  error?: string
}

export interface IValidationResult {
  errorMessages?: string
  isValid: boolean
}
