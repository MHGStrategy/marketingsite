import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.DEV_PORT || 1212);
const HOST = process.env.DEV_HOST || '127.0.0.1';

const child = spawn('npx', ['next', 'dev', '-p', String(PORT), '-H', HOST], {
  cwd: ROOT,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});

child.on('error', (err) => {
  console.error('Failed to start dev server:', err.message);
  process.exit(1);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
