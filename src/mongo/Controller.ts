import { Bson } from '../deps.ts';
import { UserQuery, User } from '../types.ts';
import config from './config.ts';
import { client } from './client.ts';

export class Controller {
  private static users = client.database(config.database).collection<User>(Deno.env.get('COLLECTION') || 'users');

  /////// CRUD
  async create(value: User | User[]) {
    if (Array.isArray(value)) await Controller.users.insertMany(value);
    else await Controller.users.insertMany([value]);
  }

  async get(query?: UserQuery) {
    return Controller.users.findOne(this.selector(query));
  }

  async getAll() {
    return Controller.users.find({}).toArray();
  }

  async set(query: UserQuery, newValue: Partial<User>) {
    return Controller.users.updateOne(this.selector(query), {
      $set: newValue,
    });
  }

  async remove(query: Partial<User>) {
    if (Array.isArray(query)) await Controller.users.deleteMany(query);
    else await Controller.users.deleteMany(query);
  }
  ///////

  async exists(query: UserQuery): Promise<boolean> {
    return !!(await this.get(query));
  }

  private selector(query?: UserQuery) {
    return typeof query === 'string' ? { _id: new Bson.ObjectId(query) } : query ? query : { _id: {} };
  }
}
