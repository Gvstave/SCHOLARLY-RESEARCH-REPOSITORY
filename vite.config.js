import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const projectDirectory = path.dirname(fileURLToPath(import.meta.url));
const consoleCallPattern = /\bconsole\.(log|warn|error|info|debug|trace)\b/g;

const silenceVendorConsole = {
  name: 'silence-vendor-console',
  renderChunk(code) {
    return code.includes('console.')
      ? { code: code.replace(consoleCallPattern, '(() => {})'), map: null }
      : null;
  },
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), silenceVendorConsole],
    esbuild: {
      drop: ['console', 'debugger'],
    },
    build: {
      sourcemap: false,
    },
    resolve: {
      alias: {
        '@': projectDirectory,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: ['localhost', '127.0.0.1', '.curatedarchive.tech'],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
