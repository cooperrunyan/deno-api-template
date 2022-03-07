import { MongoClient, env } from '../deps.ts';
import config from './config.ts';

env();

export const client = new MongoClient();
await client.connect({
  db: config.database,
  tls: true,
  servers: config.servers.map((host) => {
    return {
      host,
      port: 27017,
    };
  }),
  credential: {
    username: Deno.env.get('DB_USERNAME'),
    password: Deno.env.get('DB_PASSWORD'),
    mechanism: config.mechanism,
    db: config.database,
  },
});
