import path from 'node:path';
import dns from 'dns';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

import pkg from './package.json';

const ENV_PREFIX = 'HAVAN_ENV';

dns.setDefaultResultOrder('verbatim');

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), ENV_PREFIX),
  };

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),
      federation({
        name: pkg.name,
        remotes: {
          shell: process.env.HAVAN_ENV_SHELL_URL!,
        },
        shared: [
          'react',
          'react-dom',
          'react-router-dom',
          'jose',
          'oidc-client-ts',
          'react-oidc-context',
        ],
      }),
    ],
    envPrefix: ENV_PREFIX,
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      outDir: 'build',
    },
    server: {
      host: true,
      cors: false,
    },
  });
};
