import { UserService } from '@services/UserService'
import { UserRepository } from '@repositories/UserRepository'
import { ErrorHelper } from '@helpers/ErrorHelper'
import { ResponseHelper } from '@helpers/ResponseHelper'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED } from 'http-status-codes'
import { DatabaseHelper } from '../DatabaseHelper'
import { verify } from 'jsonwebtoken'

/**
 * Class AuthController
 */
export class AuthController {
  /**
   * Login method for authentication
   * @param request
   * @param response
   * @param next
   */
  public async login(request: Request, response: Response, next: NextFunction) {
    const db = DatabaseHelper.get()
    const service = new UserService(new UserRepository(db))
    const { email, password } = request.body
    const result = await service.login(email, password)
    const { statusCode, data } = ResponseHelper.get(result)

    response.status(statusCode).send(data)
  }

  /**
   * Verify if the user is auth by checking the token
   * @param request
   * @param response
   * @param next
   */
  public async auth(request: Request, response: Response, next: NextFunction) {
    const { JWT_KEY } = process.env
    const authorization = request.header('Authorization')
    if (!authorization) {
      const { statusCode, data } = ResponseHelper.get(
        new ErrorHelper(UNAUTHORIZED, ErrorHelper.UNAUTHORIZED)
      )

      return response.status(statusCode).send(data)
    }
    const token = authorization.replace('Bearer ', '')
    verify(token, JWT_KEY)
    next()
  }
}
