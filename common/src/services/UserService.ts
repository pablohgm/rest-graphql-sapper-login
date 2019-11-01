import { compare, hash } from 'bcrypt'
import * as JWT from 'jsonwebtoken'

import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'
import { IAuthentication } from '../types'

/**
 * Class User Service
 */
export class UserService {
  public static INVALID_EMAIL_ERROR: string = 'Invalid email'
  public static INVALID_PASSWORD_ERROR: string = 'Invalid password'
  private userRepository: UserRepository

  /**
   * Create a User Service
   * @param {UserRepository} userRepository
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  /**
   * Create an user
   * @param {object} user
   */
  public async create(user: User): Promise<string> {
    const password = await this.encryptPassword(user.password)
    const insertedId = await this.userRepository.save({ ...user, password })
    const token = this.generateAuthToken(insertedId)
    await this.userRepository.updateTokens(insertedId, [token])

    return insertedId
  }

  /**
   * Delete an user by email
   * @param {Promise<boolean>}
   */
  public async deleteByEmail(email: string): Promise<boolean> {
    return this.userRepository.deleteByEmail(email)
  }

  /**
   * Authenticate an user
   * @param {string} email
   * @param {string} password
   * @return {Authentication}
   */
  public async login(
    email: string,
    password: string
  ): Promise<IAuthentication> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      return { error: UserService.INVALID_EMAIL_ERROR }
    }
    const isPasswordCorrect = await compare(password, user.password)
    if (!isPasswordCorrect) {
      return { error: UserService.INVALID_PASSWORD_ERROR }
    }
    const token = this.generateAuthToken(user._id.toHexString())

    return { user, token }
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

  /**
   * Encrypt a password
   * @param {string} password
   * @return {Promise<string>}
   */
  public encryptPassword(password: string): Promise<string> {
    return hash(password, 8)
  }
}
