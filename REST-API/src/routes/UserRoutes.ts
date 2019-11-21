import { Router } from 'express'
import { AuthController } from '../controller/AuthController'
import { UserController } from '../controller/UserController'

/**
 * Class UserRoutes
 */
export class UserRoutes {
  private readonly router: Router
  private readonly authController: AuthController
  private readonly userController: UserController

  /**
   * Constructor
   */
  constructor() {
    this.router = Router()
    this.authController = new AuthController()
    this.userController = new UserController()
    this.routes()
  }

  /**
   * Initialize all the routes
   */
  public routes(): void {
    const { auth } = this.authController
    const { createUser } = this.userController
    this.router.post('/createUser', auth, createUser)
  }

  /**
   * Get the User routes
   */
  public getRouter(): Router {
    return this.router
  }
}
