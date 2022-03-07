import { oak } from '../deps.ts';

// @deno-types="https://deno.land/x/chalk_deno@v4.1.1-deno/index.d.ts"
import { Chalk } from 'https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js';
export const chalk = new Chalk();

import dayjs from 'https://cdn.skypack.dev/dayjs@1.10.4';
// Import locale
import 'https://cdn.skypack.dev/dayjs@1.10.4/locale/es';

export async function logger(ctx: oak.Context, next: () => Promise<unknown>) {
  ctx.response.headers.set('X-Response-Time', Date.now() + '');
  await next();

  const data = new Data(ctx);

  ctx.response.headers.set('X-Response-Time', Date.now() - +ctx.response.headers.get('X-Response-Time')! + 'ms');

  console.log(data.format('METHOD STATUS TIME PATH DATE'));
}

class Data {
  status: string;
  time: string;
  path: string;
  date: string;
  method: string;

  constructor(ctx: oak.Context) {
    this.method = chalk[
      ctx.request.method === 'POST'
        ? 'green'
        : ctx.request.method === 'DELETE'
        ? 'red'
        : ctx.request.method === 'PUT'
        ? 'yellow'
        : ctx.request.method === 'GET'
        ? 'magenta'
        : 'cyan'
    ](ctx.request.method);

    this.status = chalk.bold(ctx.response.status);
    this.time = chalk.gray(Date.now() - +ctx.response.headers.get('X-Response-Time')! + 'ms');
    this.path = chalk.bold(ctx.request.url.pathname);
    this.date = chalk.grey(dayjs().locale('en-US').format('HH:mm:ss MM/DD/YY'));
  }

  public format(style: string) {
    return style
      .replaceAll('METHOD', this.method)
      .replaceAll('STATUS', this.status)
      .replaceAll('TIME', this.time)
      .replaceAll('PATH', this.path)
      .replaceAll('DATE', this.date);
  }
}
