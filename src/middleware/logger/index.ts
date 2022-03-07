import { oak } from '../../deps.ts';
import { Data } from './Data.ts';

import 'https://cdn.skypack.dev/dayjs@1.10.4/locale/es'; // Import locale

export async function logger(ctx: oak.Context, next: () => Promise<unknown>) {
  ctx.response.headers.set('X-Response-Time', Date.now() + '');
  await next();
  ctx.response.headers.set('X-Response-Time', Date.now() - +ctx.response.headers.get('X-Response-Time')! + 'ms');

  console.log(new Data(ctx).format('METHOD STATUS TIME PATH DATE'));
}
