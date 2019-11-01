import { User } from './entities/User'

export interface IAuthentication {
  user?: User
  token?: string
  error?: string
}
