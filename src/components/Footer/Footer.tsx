import React, { Suspense } from 'react';
import { ErrorBoundary, FooterFallback } from '@freedom/react-components';

import { FooterLoading } from './FooterLoading';

const RemoteFooter = React.lazy(() => import('./RemoteFooter'));

export function Footer() {
  return (
    <ErrorBoundary fallback={<FooterFallback />}>
      <Suspense fallback={<FooterLoading />}>
        <RemoteFooter />
      </Suspense>
    </ErrorBoundary>
  );
}
