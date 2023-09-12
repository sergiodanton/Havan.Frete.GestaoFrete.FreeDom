import { useQuery } from 'react-query';

import { usersApi } from '@/services/users-api';

export function usePermissions(fnIds: string[]) {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: fnIds,
    queryFn: async () =>
      Promise.all(
        fnIds.map(fnId =>
          usersApi.get<boolean>('/Funcionalidade/TemAcesso', {
            params: { funcionalidade: fnId },
          })
        )
      ),
  });

  const permissions = response?.map(({ data }) => data);

  return {
    hasPermissions: permissions ?? Array(fnIds.length).fill(false),
    isLoading,
    isError,
  };
}
