
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const url = event.queryStringParameters.u;
  if (!url) {
    return { statusCode: 400, body: "Missing URL parameter" };
  }
  try {
    const response = await fetch(url);
    const body = await response.arrayBuffer();
    const headers = Object.fromEntries(response.headers.entries());
    headers['access-control-allow-origin'] = '*';
    return {
      statusCode: response.status,
      headers,
      body: Buffer.from(body).toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 500, body: "Proxy error: " + err.message };
  }
};
