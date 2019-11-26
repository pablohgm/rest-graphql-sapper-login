/**
 * Class ErrorHelper
 */
export class ErrorHelper extends Error {
  public static INVALID_EMAIL_ERROR: string = 'Invalid email'
  public static INVALID_PASSWORD_ERROR: string = 'Invalid password'
  public static UNAUTHORIZED: string = 'Unauthorized'

  public statusCode: number
  public message: string
  /**
   * Constructor
   * @param statusCode
   * @param message
   */
  constructor(statusCode: number, message?: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}
