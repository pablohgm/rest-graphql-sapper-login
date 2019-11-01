import * as JWT from 'jsonwebtoken'
import { UserRepository } from '../repository/UserRepository'

/**
 * Class User Service
 */
export class UserService {
  private userRepository: UserRepository

  /**
   * Create a User Service
   * @param {UserRepository} userRepository
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  /**
   * Create a user
   * @param {object} user
   */
  public async create(user: any): Promise<string> {
    const insertedId = await this.userRepository.save(user)
    const token = this.generateAuthToken(insertedId)
    await this.userRepository.updateTokens(insertedId, [token])

    return insertedId
  }

  /**
   * Generate Authentication token
   * @param {string} id
   */
  public generateAuthToken(id: string): string {
    const { JWT_KEY } = process.env
    const token = JWT.sign({ _id: id }, JWT_KEY)

    return token
  }
}
