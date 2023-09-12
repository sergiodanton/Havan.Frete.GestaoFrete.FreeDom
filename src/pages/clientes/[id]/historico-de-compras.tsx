import { toast } from '@freedom/react-components';
import { useParams } from 'react-router-dom';

import { useCustomerPurchasesHistory } from '@/hooks/useCustomerPurchaseHistory';
import { CustomerPurchaseHistoryList } from '@/components/CustomerPurchaseHistoryList';

export function CustomerPurchaseHistoryPage() {
  const { id = '' } = useParams<{ id: string }>();
  const {
    findAll,
    deleteRecord,
    isLoading,
    isDeleteRecordLoading,
    isFetched,
    isError,
    error,
  } = useCustomerPurchasesHistory({
    id,
  });

  if (isError) {
    toast.danger({
      title: 'Falha ao carregar histórico de compras',
      description: error?.message || 'Verifique sua conexão e tente novamente',
    });
  }

  async function handleDeletePurchaseHistory(purchaseId: string) {
    try {
      await deleteRecord(purchaseId);
      toast.success('Histórico deletado');
    } catch (err) {
      toast.danger({
        title: 'Falha ao deletar histórico',
        description: 'Verifique sua conexão e tente novamente',
      });
    }
  }

  return (
    <CustomerPurchaseHistoryList
      isLoading={isLoading || isDeleteRecordLoading}
      isFetched={isFetched}
      purchasesHistory={findAll()}
      onDeletePurchaseHistory={handleDeletePurchaseHistory}
    />
  );
}
