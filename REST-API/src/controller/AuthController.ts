import { UserService } from '@services/UserService'
import { UserRepository } from '@repositories/UserRepository'
import { Request, Response, NextFunction } from 'express'
import { DatabaseHelper } from '../DatabaseHelper'
import { verify } from 'jsonwebtoken'

/**
 * Class AuthController
 */
export class AuthController {
  constructor() {}

  /**
   * Login method for authentication
   * @param request
   * @param response
   * @param next
   */
  public async login(request: Request, response: Response, next: NextFunction) {
    try {
      const db = DatabaseHelper.get()
      const service = new UserService(new UserRepository(db))
      const { email, password } = request.body
      const result = await service.login(email, password)
      response.status(200).send(result)
    } catch (error) {
      response.status(401).send(error)
    }
  }

  /**
   * Verify if the user is auth by checking the token
   * @param request
   * @param response
   * @param next
   */
  public async auth(request: Request, response: Response, next: NextFunction) {
    try {
      const { JWT_KEY } = process.env
      const token = request.header('Authorization').replace('Bearer ', '')
      verify(token, JWT_KEY)
      next()
    } catch (error) {
      response.status(401).send(error)
    }
  }
}
