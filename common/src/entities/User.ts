import { ObjectId } from 'mongodb'

export class User {
  public _id?: ObjectId // tslint:disable-line variable-name
  public name: string
  public email: string
  public password: string
}
