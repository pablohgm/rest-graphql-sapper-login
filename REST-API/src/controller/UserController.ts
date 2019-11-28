import { ResponseHelper } from '@helpers/ResponseHelper'
import { UserRepository } from '@repositories/UserRepository'
import { UserService } from '@services/UserService'
import { NextFunction, Request, Response } from 'express'
import { DatabaseHelper } from '../DatabaseHelper'

/**
 * Class UserController
 */
export class UserController {
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
    const db = DatabaseHelper.get()
    const service = new UserService(new UserRepository(db))
    const { name, email, password } = request.body
    const result = await service.create({ name, email, password })
    const { statusCode, data } = ResponseHelper.get(result)

    response.status(statusCode).send(data)
  }
}
