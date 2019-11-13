import { UserRepository } from '@repositories/UserRepository'
import { UserService } from '@services/UserService'
import { NextFunction, Request, Response } from 'express'
import { DatabaseHelper } from '../DatabaseHelper'

/**
 * Class UserController
 */
export class UserController {
  public constructor() {}

  /**
   * Create a new user
   * @param request
   * @param response
   * @param next
   */
  public async createUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const db = DatabaseHelper.get()
      const service = new UserService(new UserRepository(db))
      const { name, email, password } = request.body
      await service.create({ name, email, password })
      response.status(200).json('The user has been created')
    } catch (error) {
      next(error)
    }
  }
}
