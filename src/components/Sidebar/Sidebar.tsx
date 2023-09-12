import React, { Suspense } from 'react';
import { ErrorBoundary, SidebarFallback } from '@freedom/react-components';
import { Link } from 'react-router-dom';

import { SidebarLoading } from './SidebarLoading';

const RemoteSidebar = React.lazy(() => import('./RemoteSidebar'));

export function Sidebar() {
  return (
    <ErrorBoundary
      fallback={
        <SidebarFallback
          renderClientNavigationComponent={({ href, children }) => (
            <Link to={href}>{children}</Link>
          )}
        />
      }
    >
      <Suspense fallback={<SidebarLoading />}>
        <RemoteSidebar />
      </Suspense>
    </ErrorBoundary>
  );
}
