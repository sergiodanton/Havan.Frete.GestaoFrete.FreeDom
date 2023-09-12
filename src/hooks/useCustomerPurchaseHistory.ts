import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { PurchaseHistoryGetResponse } from '@/models/purchase-history';
import { api } from '@/services/api';

import { CUSTOMERS_API_URL } from './useCustomer';

export const CUSTOMER_PURCHASES_HISTORY_API_URL = `${CUSTOMERS_API_URL}/:id/purchases-history`;
export const PURCHASES_HISTORY_QUERY_KEY = 'purchase/history';

export function useCustomerPurchasesHistory({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
    error,
    isFetched,
  } = useQuery<
    AxiosResponse,
    AxiosError,
    AxiosResponse<PurchaseHistoryGetResponse>
  >({
    queryKey: [PURCHASES_HISTORY_QUERY_KEY],
    queryFn: async () =>
      api(CUSTOMER_PURCHASES_HISTORY_API_URL.replace(':id', id)),
    enabled: !!id,
  });

  const purchasesHistory = response?.data.purchasesHistory;
  const isEmpty = !!purchasesHistory?.length;

  function findAll() {
    return purchasesHistory || [];
  }

  const {
    mutateAsync: deleteRecordAsync,
    isLoading: isDeleteRecordLoading,
    isError: isDeleteRecordError,
    isSuccess: isDeleteRecordSuccess,
    error: deleteRecordError,
  } = useMutation<AxiosResponse, AxiosError, string>({
    mutationFn: async (recordId: string) =>
      api.delete(CUSTOMER_PURCHASES_HISTORY_API_URL.replace(':id', recordId)),
    onSuccess: async () =>
      queryClient.invalidateQueries(PURCHASES_HISTORY_QUERY_KEY),
  });

  async function deleteRecord(recordId: string) {
    return deleteRecordAsync(recordId);
  }

  return {
    findAll,
    isLoading,
    isError,
    error,
    isEmpty,
    isFetched,
    isDeleteRecordLoading,
    isDeleteRecordError,
    isDeleteRecordSuccess,
    deleteRecordError,
    deleteRecord,
  };
}
