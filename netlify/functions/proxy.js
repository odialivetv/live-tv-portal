// netlify/functions/proxy.js
// Netlify Function: proxy allowed hosts with CORS headers.

export async function handler(event, context) {
  try {
    const qs = event.queryStringParameters || {};
    const u = qs.u;
    if (!u) return { statusCode: 400, body: 'Missing url param `u`' };

    const allowed = [
      'packetcdn.me',
      'spr1.packetcdn.me',
      'livetv.tarangplus.in',
      'nw18live.cdn.jio.com',
      'feeds.intoday.in',
      'd35j504z0x2vu2.cloudfront.net',
      'techstop.online',
      'ythls.armelin.one',
      'b1g.uk',
      'www.nandighoshatvlive.com'
    ];

    let upstream;
    try {
      upstream = new URL(u);
    } catch (e) {
      return { statusCode: 400, body: 'Invalid URL' };
    }

    const host = upstream.hostname;
    const ok = allowed.some(domain => host === domain || host.endsWith('.' + domain));
    if (!ok) {
      return { statusCode: 403, body: 'Host not allowed: ' + host };
    }

    const res = await fetch(u, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Netlify Proxy)' }
    });

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const buf = await res.arrayBuffer();

    return {
      statusCode: res.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: Buffer.from(buf).toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    console.error('Proxy error:', err);
    return { statusCode: 500, body: 'Proxy error' };
  }
}
