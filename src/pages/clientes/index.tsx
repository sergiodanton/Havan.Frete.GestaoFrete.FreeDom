import { ErrorBoundary } from '@freedom/react-components';
import { useOutlet } from 'react-router-dom';

import { CustomersList } from '@/components/CustomersList';
import { useSearchParamsState } from '@/hooks/useSearchParamsState';
import { useCustomer } from '@/hooks/useCustomer';
import { CustomersFilter } from '@/components/CustomersFilter';
import type {
  CustomerFilterPayload,
  CustomerFilterParams,
} from '@/components/CustomersFilter';

export function CustomersPage() {
  const childRoute = useOutlet();

  const [filterParams, setFilterParams] =
    useSearchParamsState<CustomerFilterParams>({
      name: '',
      UFs: [],
      customerType: '',
      createdAt: null,
    });

  const {
    findAll,
    isDeleteRecordLoading,
    isLoading,
    isAddRecordLoading,
    addRecord,
    isFetched,
    updateRecord,
    deleteRecord,
  } = useCustomer({
    enabled:
      !!filterParams.name ||
      !!filterParams.createdAt ||
      !!filterParams.UFs.length ||
      !!filterParams.customerType,
    queryKeys: [
      filterParams.name,
      filterParams.createdAt,
      filterParams.UFs,
      filterParams.customerType,
    ],
  });

  function onSubmit(formData: CustomerFilterPayload) {
    setFilterParams({
      name: formData.name,
      UFs: formData.UFs.map(UF => UF.value),
      customerType: formData.customerType?.value,
      createdAt: formData.createdAt,
    });
  }

  if (childRoute) {
    return childRoute;
  }

  return (
    <div>
      <section className="mb-4">
        <CustomersFilter
          onSubmit={onSubmit}
          onClear={() => setFilterParams(null)}
          filterParams={filterParams}
        />
      </section>

      <ErrorBoundary fallback={<h1>Oops!</h1>}>
        <CustomersList
          customers={findAll()}
          isLoading={isLoading || isDeleteRecordLoading}
          isFetched={isFetched}
          isAddCustomerLoading={isAddRecordLoading}
          onAddCustomer={addRecord}
          onUpdateCustomer={updateRecord}
          onDeleteCustomer={deleteRecord}
        />
      </ErrorBoundary>
    </div>
  );
}
