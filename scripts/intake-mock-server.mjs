#!/usr/bin/env node
/**
 * Minimal mock for MHG SYNC intake API used during Playwright E2E runs.
 * Accepts POST /api/intake and returns a success payload.
 */
import http from 'node:http';

const PORT = Number(process.env.INTAKE_MOCK_PORT || 8000);

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && (req.url === '/health' || req.url === '/api/intake')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === 'POST' && req.url === '/api/intake') {
    let body = '';
    for await (const chunk of req) body += chunk;

    try {
      const payload = JSON.parse(body);
      if (!payload.formType || !payload.clientEmail) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ detail: 'Invalid intake payload.' }));
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(
        JSON.stringify({
          url: `https://sync.mhgstrategy.com/dashboard/${payload.formType}/beta-test`,
          emailSent: true,
        }),
      );
      return;
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ detail: 'Invalid JSON.' }));
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ detail: 'Not found.' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Intake mock server listening on http://127.0.0.1:${PORT}`);
});
