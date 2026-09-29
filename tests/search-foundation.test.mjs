import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { onRequest } from '../functions/naverf25a6a23decbc53256c83fd625d68e88.html.js';

const verificationRoute = '/naverf25a6a23decbc53256c83fd625d68e88.html';
const verificationBody = 'naver-site-verification: naverf25a6a23decbc53256c83fd625d68e88.html';

test('Naver verification file route responds directly with the exact token', async () => {
  const response = await onRequest({
    request: new Request(`https://tech.emfls.com${verificationRoute}`),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('location'), null);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(await response.text(), verificationBody);
});

test('Cloudflare Pages invokes a Function only for the exact verification route', async () => {
  const routes = JSON.parse(
    await readFile(new URL('../public/_routes.json', import.meta.url), 'utf8'),
  );

  assert.deepEqual(routes, {
    version: 1,
    include: [verificationRoute],
    exclude: [],
  });
});
