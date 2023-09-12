import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from 'oidc-client-ts';
import { AuthProvider, hasAuthParams } from 'react-oidc-context';

import { App } from '@/App';
import { worker } from '@/mocks/browser';

startApp();

const oidcConfig: UserManagerSettings = {
  authority: import.meta.env.HAVAN_ENV_AUTHORITY,
  client_id: import.meta.env.HAVAN_ENV_CLIENT_ID,
  redirect_uri: window.location.href,
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: localStorage }),
};

const userManager = new UserManager({
  ...oidcConfig,
});

async function startApp() {
  const container = document.getElementById('root');

  try {
    await pingHavanNetwork();

    const isTryingToSignIn = hasAuthParams();

    const user = await userManager.getUser();

    if (!user && !isTryingToSignIn) {
      await userManager.signinRedirect();
      return;
    }

    if (user?.expired) {
      localStorage.clear();
      await userManager.signinRedirect();
      return;
    }

    mount(container!);
  } catch (err: any) {
    const root = ReactDOM.createRoot(container!);
    root.render(<NetworkErrorPage error={err} />);
  }
}

async function mount(element: HTMLElement) {
  const root = ReactDOM.createRoot(element);

  if (import.meta.env.MODE !== 'production') {
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  root.render(
    <AuthProvider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...oidcConfig}
    >
      <App />
    </AuthProvider>
  );
}

async function pingHavanNetwork() {
  return fetch(import.meta.env.HAVAN_ENV_AUTHORITY, {
    mode: 'no-cors',
  });
}

type NetworkErrorPageProps = {
  error?: Error;
};

function NetworkErrorPage({ error }: NetworkErrorPageProps) {
  return (
    <div>
      <h1>Problema ao conectar na Rede Havan.</h1>
      <h2>Cheque se voce está conectado à VPN.</h2>
      <div>
        <p>{error?.message}</p>
        <p>{JSON.stringify(error?.stack)}</p>
      </div>
    </div>
  );
}
