import { Db, MongoClient } from 'mongodb'

/**
 * Class DatabaseHelper
 */
export class DatabaseHelper {
  private static client: MongoClient

  /**
   * Connect with a mongo database using the URI from the .env file
   * @param callback
   */
  public static async connect(callback?: any) {
    const { MONGO_URI } = process.env
    const client = await MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true
    })
    this.client = client
    callback && callback()
  }

  /**
   * Get the Db mongo instance
   */
  public static get(): Db {
    const { MONGO_DATABASE } = process.env

    return this.client.db(MONGO_DATABASE)
  }

  /**
   * Close de mongo database connection
   */
  public static close(): Promise<void> {
    return this.client.close()
  }
}
