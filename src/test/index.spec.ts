import { t } from '../deps.ts';

Deno.test('should return a json response', async () => {
  console.log(Deno.env.get('PORT'));
  const res = await fetch(`http://localhost:${Deno.env.get('PORT') || 3000}/api/test`);
  const data = await res.json();
  t.assertStringIncludes(data.message, '');
});
