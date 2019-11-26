import { ErrorHelper } from '@helpers/ErrorHelper'
import { UserRepository } from '@repositories/UserRepository'
import { UserService } from '@services/UserService'

import { DatabaseHelper } from '../src/DatabaseHelper'

/**
 * Class TestHelper
 */
export class TestHelper {
  /**
   * Get a mock user
   */
  public static getDefaultUser() {
    return {
      email: 'test@test.com',
      name: 'test',
      password: 'Test1234!'
    }
  }

  /**
   * Create an user
   */
  public static createDefaultUser(): Promise<{ id: string } | ErrorHelper> {
    const db = DatabaseHelper.get()
    const service = new UserService(new UserRepository(db))

    return service.create(TestHelper.getDefaultUser())
  }

  /**
   * Create an user
   */
  public static deleteDefaultUser(): Promise<boolean | ErrorHelper> {
    const db = DatabaseHelper.get()
    const service = new UserService(new UserRepository(db))
    const { email } = TestHelper.getDefaultUser()

    return service.deleteByEmail(email)
  }
}
