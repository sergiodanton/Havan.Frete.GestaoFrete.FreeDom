import { useQuery } from 'react-query';

import { usersApi } from '@/services/users-api';

export function usePermission(permission: string) {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [permission],
    queryFn: async () =>
      usersApi.get('/Funcionalidade/TemAcesso', {
        params: {
          funcionalidade: permission,
        },
      }),
  });

  return {
    hasPermission: response?.data === true,
    isLoading,
    isError,
  };
}
