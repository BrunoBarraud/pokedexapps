import type { APIContext } from 'astro';

export const onRequest = async function (context: APIContext, next: () => Promise<Response>) {
  const response = await next();

  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: response.headers,
    });
  }

  return response;
};
