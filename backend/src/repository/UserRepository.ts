import { Db } from 'mongodb'

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
  public async save(user: any): Promise<string> {
    const { insertedId } = await this.database
      .collection('users')
      .insertOne(user)

    return insertedId.toHexString()
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
