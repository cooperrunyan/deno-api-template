import { Bson } from './deps.ts';

export class User {
  public _id: Bson.ObjectId;

  constructor() {
    this._id = new Bson.ObjectId();
  }
}

export type UserQuery = Partial<User> | string;
