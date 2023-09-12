import React from 'react';
import { toast } from '@freedom/react-components';

import { LoadingValidation } from '@/components/LoadingValidation';
import { Forbidden } from '@/components/403';
import { usePermission } from '@/hooks/usePermission';

type RestrictedPageProps = {
  children: React.ReactElement;
  permission: string;
};

export function RestrictedPage({ children, permission }: RestrictedPageProps) {
  const { hasPermission, isError, isLoading } = usePermission(permission);

  if (isLoading) {
    return <LoadingValidation />;
  }

  if (isError) {
    toast.danger(
      'Não foi possível validar o seu acesso à pagina. Tente novamente mais tarde.'
    );

    return null;
  }

  if (!hasPermission) {
    return <Forbidden />;
  }

  return children;
}
