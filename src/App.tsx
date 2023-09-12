import { AppInitializers } from '@/AppInitializers';
import { AppRoutes } from '@/AppRoutes';

export function App() {
  return (
    <AppInitializers>
      <AppRoutes />
    </AppInitializers>
  );
}
