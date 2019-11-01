import { Db } from 'mongodb'

import { User } from '../entities/User'

/**
 * Class User Repository
 */
export class UserRepository {
  private database: Db

  /**
   * Create a UserRepository
   * @param {Db} databaseConnector
   */
  public constructor(databaseConnector: Db) {
    this.database = databaseConnector
  }

  /**
   * Save a user
   * @param {object} user
   * @return {Promise<string>}
   */
  public async save(user: User): Promise<string> {
    const { insertedId } = await this.database
      .collection('users')
      .insertOne(user)

    return insertedId.toHexString()
  }

  /**
   * Find an user by email
   * @param {object} user
   * @return {Promise<User>}
   */
  public findByEmail(email: string): Promise<User | null> {
    return this.database.collection('users').findOne({ email })
  }

  /**
   * Remove an user by email
   * @param {object} user
   * @return {Promise<User>}
   */
  public async deleteByEmail(email: string): Promise<boolean> {
    const { deletedCount } = await this.database
      .collection('users')
      .deleteOne({ email })

    return !!deletedCount
  }

  /**
   * Update tokens
   * @param {string} id
   * @param {string[]} tokens
   * @return {Promise<number>}
   */
  public async updateTokens(id: string, tokens: string[]): Promise<number> {
    const { modifiedCount } = await this.database
      .collection('users')
      .updateOne({ _id: id }, { $set: { tokens } })

    return modifiedCount
  }
}
