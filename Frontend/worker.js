// import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// addEventListener('fetch', event => {
//   event.respondWith(handleEvent(event));
// });

// async function handleEvent(event) {
//   try {
//     return await getAssetFromKV(event);
//   } catch (e) {
//     return await getAssetFromKV(event, {
//       mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req)
//     });
//   }
// }

import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event).catch(err => new Response('Internal Error', { status: 500 })));
});

async function handleEvent(event) {
  const request = event.request;

  // Always map non-asset routes to /index.html for React Router
  const options = {
    mapRequestToAsset: req => {
      const url = new URL(req.url);

      // If the request is for a file (e.g. .js, .css, .png), serve as-is
      if (url.pathname.match(/\.[^/]+$/)) {
        return req;
      }

      // Otherwise, serve index.html (for React Router)
      return new Request(`${url.origin}/index.html`, req);
    }
  };

  return await getAssetFromKV(event, options);
}
