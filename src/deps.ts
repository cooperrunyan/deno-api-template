export * as oak from 'https://deno.land/x/oak@v6.5.1/mod.ts';

export * as t from 'https://deno.land/std@0.125.0/testing/asserts.ts';

// @deno-types="https://deno.land/x/chalk_deno@v4.1.1-deno/index.d.ts"
import { Chalk } from 'https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js';
export const chalk = new Chalk();

export { default as dayjs } from 'https://cdn.skypack.dev/dayjs@1.10.4';

import { config } from 'https://deno.land/x/dotenv/mod.ts';
export const env = () => Object.entries(config()).forEach(([key, value]) => Deno.env.set(key, value));

export { Bson, MongoClient } from 'https://deno.land/x/mongo@v0.29.1/mod.ts';
