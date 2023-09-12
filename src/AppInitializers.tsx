import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PersistGate } from 'redux-persist/integration/react';
import { Toasts } from '@freedom/react-components';

import { setupInterceptors } from '@/helpers/api.helpers';
import { store, persistor } from '@/stores/store';
import { ENVIRONMENT } from '@/constants';
import './styles.css';

type AppInitializersProps = {
  children: React.ReactElement;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppInitializers({ children }: AppInitializersProps) {
  setupInterceptors(store);

  return (
    <QueryClientProvider client={queryClient}>
      {ENVIRONMENT === 'development' && <ReactQueryDevtools />}

      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toasts />
          {children}
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
