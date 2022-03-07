import { chalk, dayjs, oak } from '../../deps.ts';

export class Data {
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
