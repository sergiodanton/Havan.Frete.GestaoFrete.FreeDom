/// <reference types="vite/client" />

declare module 'shell/header';
declare module 'shell/footer';
declare module 'shell/sidebar';
declare module 'shell/settings';

interface ImportMetaEnv {
  readonly HAVAN_ENV_AUTHORITY: string;
  readonly HAVAN_ENV_CLIENT_ID: string;
  readonly HAVAN_ENV_SHELL_URL: string;
  readonly HAVAN_ENV_API_USERS: string;
  readonly HAVAN_ENV_FREEDOM_WEBSITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
