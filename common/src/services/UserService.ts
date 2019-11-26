import { Schema } from '@hapi/joi'
import { compare, hash } from 'bcrypt'
import { BAD_REQUEST } from 'http-status-codes'
import * as JWT from 'jsonwebtoken'

import { User } from '../entities/User'
import { ErrorHelper } from '../helpers/ErrorHelper'
import { UserRepository } from '../repositories/UserRepository'
import LoginSchema from '../schemas/LoginSchema'
import UserSchema from '../schemas/UserSchema'
import { IAuthentication, IValidationResult } from '../types'

/**
 * Class User Service
 */
export class UserService {
  public static EXPIRES_IN: string = '7d'
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
  public async create(user: User): Promise<{ id: string } | ErrorHelper> {
    const validation = await this.validate(UserSchema, user)
    if (!validation.isValid) {
      return new ErrorHelper(BAD_REQUEST, validation.errorMessages)
    }
    const password = await this.encryptPassword(user.password)
    const insertedId = await this.userRepository.save({ ...user, password })
    const token = this.generateAuthToken(insertedId, UserService.EXPIRES_IN)
    await this.userRepository.updateTokens(insertedId, [token])

    return { id: insertedId }
  }

  /**
   * Delete an user by email
   * @return {Promise<boolean>}
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
  ): Promise<IAuthentication | ErrorHelper> {
    const validation = await this.validate(LoginSchema, { email, password })
    if (!validation.isValid) {
      return new ErrorHelper(BAD_REQUEST, validation.errorMessages)
    }
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      return new ErrorHelper(BAD_REQUEST, ErrorHelper.INVALID_EMAIL_ERROR)
    }
    const isPasswordCorrect = await compare(password, user.password)
    if (!isPasswordCorrect) {
      return new ErrorHelper(BAD_REQUEST, ErrorHelper.INVALID_PASSWORD_ERROR)
    }
    const expiresIn = UserService.EXPIRES_IN
    const token = this.generateAuthToken(user._id.toHexString(), expiresIn)
    const { name } = user

    return { name, email, token, expiresIn }
  }

  /**
   * Generate Authentication token
   * @param {string} id
   */
  public generateAuthToken(id: string, expiresIn: string): string {
    const { JWT_KEY } = process.env
    const token = JWT.sign({ _id: id }, JWT_KEY, {
      expiresIn
    })

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

  /**
   * Validate object
   * @param {ObjectSchema} schema
   * @return {Promise<IValidationResult>}
   */
  public async validate<T>(
    schema: Schema,
    model: T
  ): Promise<IValidationResult> {
    const { error } = schema.validate(model)

    return {
      errorMessages: error ? `Validation Error: ${error.message}` : null,
      isValid: !error
    }
  }
}
