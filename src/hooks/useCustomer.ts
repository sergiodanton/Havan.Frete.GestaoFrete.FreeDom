import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { Customer, CustomerGetResponse } from '@/models/customer';
import { api } from '@/services/api';

export const CUSTOMERS_API_URL = '/api/customers';
export const CUSTOMERS_QUERY_KEY = 'customers';

export function useCustomer({
  enabled = true,
  queryKeys = [],
}: {
  enabled?: boolean;
  queryKeys?: any[];
} = {}) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const {
    data: response,
    isError,
    error,
    isLoading,
    isFetched,
    refetch,
  } = useQuery<AxiosResponse, AxiosError, AxiosResponse<CustomerGetResponse>>({
    queryKey: [CUSTOMERS_QUERY_KEY, ...queryKeys],
    queryFn: async () =>
      api.get(CUSTOMERS_API_URL, {
        params: searchParams,
      }),
    enabled,
  });

  const {
    mutateAsync: addRecordAsync,
    isLoading: isAddRecordLoading,
    isError: isAddRecordError,
    isSuccess: isAddRecordSuccess,
    error: addRecordError,
  } = useMutation<
    AxiosResponse<Customer>,
    AxiosError,
    Omit<Customer, 'id' | 'code' | 'createdAt'>
  >({
    mutationFn: async (customer: Omit<Customer, 'id' | 'code' | 'createdAt'>) =>
      api.post(CUSTOMERS_API_URL, {
        customer,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(CUSTOMERS_QUERY_KEY);
    },
  });

  const {
    mutateAsync: updateRecordAsync,
    isLoading: isUpdateRecordLoading,
    isError: isUpdateRecordError,
    isSuccess: isUpdateRecordSuccess,
    error: updateRecordError,
  } = useMutation<AxiosResponse, AxiosError, Customer>({
    mutationFn: async (customer: Customer) =>
      api.patch(`${CUSTOMERS_API_URL}/${customer.id}`, {
        customer,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(CUSTOMERS_QUERY_KEY);
    },
  });

  const {
    mutateAsync: deleteRecordAsync,
    isLoading: isDeleteRecordLoading,
    isError: isDeleteRecordError,
    isSuccess: isDeleteRecordSuccess,
    error: deleteRecordError,
  } = useMutation<AxiosResponse, AxiosError, string>({
    mutationFn: async (id: string) => api.delete(`${CUSTOMERS_API_URL}/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries(CUSTOMERS_QUERY_KEY);
    },
  });

  const customers = response?.data.customers;
  const isEmpty = !customers?.length;

  function findAll() {
    return response?.data.customers || [];
  }

  async function addRecord(
    customer: Omit<Customer, 'id' | 'code' | 'createdAt'>
  ) {
    const newCustomer = await addRecordAsync(customer);

    if (enabled) {
      await refetch();
    }

    return newCustomer;
  }

  async function updateRecord(customer: Customer) {
    return updateRecordAsync(customer);
  }

  async function deleteRecord(id: string) {
    return deleteRecordAsync(id);
  }

  return {
    findAll,
    isEmpty,
    isLoading,
    isError,
    error,
    isFetched,
    isAddRecordLoading,
    isAddRecordError,
    isAddRecordSuccess,
    addRecordError,
    addRecord,
    isUpdateRecordLoading,
    isUpdateRecordError,
    isUpdateRecordSuccess,
    updateRecordError,
    updateRecord,
    isDeleteRecordLoading,
    isDeleteRecordError,
    isDeleteRecordSuccess,
    deleteRecordError,
    deleteRecord,
    response,
  };
}
