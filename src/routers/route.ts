import { oak } from '../deps.ts';

export const test = new oak.Router({ prefix: '/api/test' });

test.get('/', async (ctx) => {
  ctx.response.body = {
    message: 'hello world from /api/test',
  };
});
