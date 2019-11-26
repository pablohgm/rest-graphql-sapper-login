import { OK } from 'http-status-codes'

/**
 * Class ResponseHelper
 */
export class ResponseHelper {
  /**
   * Get a formatted object before response
   * @param data
   */
  public static get(data: any) {
    if (!ResponseHelper.isError(data)) {
      return { statusCode: OK, data }
    }

    return { statusCode: data.statusCode, data }
  }

  /**
   * verify is the data is an error
   * @param data
   */
  public static isError(data: any): boolean {
    const { message, statusCode } = data

    return !!message && statusCode
  }
}
