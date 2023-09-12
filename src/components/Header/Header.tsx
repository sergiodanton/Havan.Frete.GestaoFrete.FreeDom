import React, { Suspense } from 'react';
import { useAuth } from 'react-oidc-context';
import { useSelector } from 'react-redux';
import { ErrorBoundary, HeaderFallback } from '@freedom/react-components';

import { APP_NAME } from '@/constants';
import { getUser } from '@/stores/user/user.selectors';

import { HeaderLoading } from './HeaderLoading';

const RemoteHeader = React.lazy(() => import('./RemoteHeader'));

export function Header() {
  const auth = useAuth();
  const { nome, matricula } = useSelector(getUser);

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    auth
      .removeUser()
      .then(() => auth.signoutRedirect())
      .then(() => auth.revokeTokens());
  }

  return (
    <ErrorBoundary
      fallback={
        <HeaderFallback
          systemName={APP_NAME}
          user={{
            name: nome || '',
            registrationCode: matricula || '',
          }}
          onLogout={logout}
        />
      }
    >
      <Suspense fallback={<HeaderLoading />}>
        <RemoteHeader
          systemName={APP_NAME}
          user={{
            name: nome,
            registrationCode: matricula,
          }}
          onLogout={logout}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
