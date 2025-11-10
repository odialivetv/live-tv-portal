Live TV Netlify Deploy (FULL LIST)
======================================

Included:
- index.html                 -> Full channel list (Odia + Hindi + Cricket + Movies) as you provided.
- Features: fullscreen + rotate, auto-refresh for tokened URLs (8 min), HLS.js fallback.
- Smart URL normalization: Handles older "/proxy" and "/proxy-spr1" paths by mapping to real hosts.
- netlify/functions/proxy.js -> Whitelisted proxy (CORS).
- netlify.toml               -> Functions path config.

Deploy (Git-based):
1) Create GitHub repo and push files.
2) Netlify -> New site from Git -> select repo.
3) Build command: (leave blank)
4) Publish directory: .
5) Functions directory: netlify/functions
6) Deploy.

Notes:
- For production, add API key check on proxy.
- Drag & Drop on Netlify does NOT deploy functions. Use Git-based deploy.
