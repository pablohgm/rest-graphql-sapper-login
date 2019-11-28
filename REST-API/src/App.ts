import { Server } from 'http'

import * as bodyParser from 'body-parser'
import express from 'express'

import { DatabaseHelper } from './DatabaseHelper'
import { AuthRoutes } from './routes/AuthRoutes'
import { UserRoutes } from './routes/UserRoutes'

/**
 * Class App
 */
export class App {
  private app: express.Application

  /**
   * Constructor
   */
  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  /**
   * Initialize the routes
   */
  public routes(): void {
    const authRouter = new AuthRoutes()
    const userRouter = new UserRoutes()
    this.app.use('/auth', authRouter.getRouter())
    this.app.use('/user', userRouter.getRouter())
  }

  /**
   * Initialize the routes
   */
  public config(): void {
    this.app.use(bodyParser.json())
  }

  /**
   * Get the server
   */
  public getServer(): Server {
    const { PORT } = process.env

    return this.app.listen(PORT, () =>
      console.info(`🚀🌎 is listening on port ${PORT}`)
    )
  }

  /**
   * Start services such as database, etc.
   */
  public async start(): Promise<void> {
    await DatabaseHelper.connect()
  }
}
