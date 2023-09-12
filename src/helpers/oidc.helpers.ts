import { User } from 'oidc-client-ts';

import { HAVAN_ENV_AUTHORITY, HAVAN_ENV_CLIENT_ID } from '@/constants';

export function getUserFromOidcStorage() {
  const oidcStorage = localStorage.getItem(
    `oidc.user:${HAVAN_ENV_AUTHORITY}:${HAVAN_ENV_CLIENT_ID}`
  );

  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}
