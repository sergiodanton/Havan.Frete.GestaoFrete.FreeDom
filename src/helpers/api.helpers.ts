import { InternalAxiosRequestConfig } from 'axios';

import type { Store } from '@/stores/store';
import { api } from '@/services/api';
import { usersApi } from '@/services/users-api';
import { getUserFromOidcStorage } from '@/helpers/oidc.helpers';

export function setupInterceptors(_store: Store) {
  api.interceptors.request.use(config => {
    const user = getUserFromOidcStorage();
    const token = user?.access_token;

    addAuthorizationToken(config, token);

    return config;
  });

  api.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  );

  usersApi.interceptors.request.use(config => {
    const user = getUserFromOidcStorage();
    const token = user?.access_token;

    addAuthorizationToken(config, token);

    return config;
  });

  usersApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  );
}

export function addAuthorizationToken(
  config: InternalAxiosRequestConfig<any>,
  token?: string
) {
  if (!token) {
    return;
  }

  // Desabilitado pois é no interceptador precisamos
  // adicionar o token de autenticação
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
}
