import { toast, ErrorBoundary } from '@freedom/react-components';

import { useSuppliers } from '@/hooks/useSuppliers';
import { SuppliersList } from '@/components/SuppliersList';

export function SuppliersPage() {
  const { findAll, isLoading, isError, error } = useSuppliers();

  if (isError) {
    toast.danger({
      title: 'Falha ao carregar lista de fornecedores',
      description: error?.message || 'Verifique sua conexão e tente novamente',
    });
  }

  return (
    <ErrorBoundary fallback={<p>Parece que algo deu errado...</p>}>
      <SuppliersList suppliers={findAll()} isLoading={isLoading} />
    </ErrorBoundary>
  );
}
