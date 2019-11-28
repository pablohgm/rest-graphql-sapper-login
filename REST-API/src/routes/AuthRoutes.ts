import { Router } from 'express'
import { AuthController } from '../controller/AuthController'

/**
 * Class AuthRoutes
 */
export class AuthRoutes {
  private readonly router: Router
  private readonly authController: AuthController

  /**
   * Constructor
   */
  constructor() {
    this.router = Router()
    this.authController = new AuthController()
    this.routes()
  }

  /**
   * Initialize all the routes
   */
  public routes(): void {
    const { login } = this.authController
    this.router.post('/login', login)
  }

  /**
   * Get the Auth routes
   */
  public getRouter(): Router {
    return this.router
  }
}
