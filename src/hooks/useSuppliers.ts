import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { SupplierGetResponse } from '@/models/supplier';
import { api } from '@/services/api';

export const SUPPLIERS_API_URL = '/api/suppliers';
export const SUPPLIERS_QUERY_KEY = 'suppliers';

export function useSuppliers() {
  const {
    data: response,
    isError,
    error,
    isLoading,
    isFetched,
  } = useQuery<AxiosResponse, AxiosError, AxiosResponse<SupplierGetResponse>>({
    queryKey: [SUPPLIERS_QUERY_KEY],
    queryFn: async () => api(SUPPLIERS_API_URL),
  });

  const suppliers = response?.data.suppliers;
  const isEmpty = !suppliers?.length;

  function findAll() {
    return response?.data.suppliers || [];
  }

  return {
    findAll,
    isEmpty,
    isLoading,
    isError,
    error,
    isFetched,
  };
}
