import { DataGrid, DataGridColumn, toast } from '@freedom/react-components';
import { AxiosResponse } from 'axios';

import { DataGridColumnFormatter } from '@/components/DataGridColumnFormatter';
import { Customer } from '@/models/customer';
import { useGridParams } from '@/hooks/useGridParams';

import { CustomerAddAndEditModal } from './CustomerAddAndEditModal';
import { CustomerDeleteModal } from './CustomerDeleteModal';
import { CustomerRowActions } from './CustomerRowActions';
import { customerTypesLabel } from './CustomersList.constants';

type CustomerListProps = {
  customers: Customer[];
  isLoading?: boolean;
  isFetched?: boolean;
  isAddCustomerLoading?: boolean;
  onAddCustomer: (
    customer: Omit<Customer, 'id' | 'code' | 'createdAt'>
  ) => Promise<AxiosResponse<Customer>>;
  onUpdateCustomer: (customer: Customer) => Promise<AxiosResponse<Customer>>;
  onDeleteCustomer: (id: string) => Promise<AxiosResponse<void>>;
};

const columns: DataGridColumn<Customer>[] = [
  {
    name: 'code',
    title: 'Código',
  },
  {
    name: 'name',
    title: 'Nome',
  },
  {
    name: 'city',
    title: 'Cidade',
  },
  {
    name: 'UF',
  },
  {
    name: 'customerType',
    title: 'Tipo de cliente',
    getCellValue: row => customerTypesLabel[row.customerType],
  },
  {
    name: 'createdAt',
    title: 'Data de cadastro',
    getCellValue: row => new Date(row.createdAt),
  },
];

export function CustomersList({
  customers,
  isLoading,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  isFetched,
  isAddCustomerLoading,
}: CustomerListProps) {
  const {
    pageSize,
    page,
    sorting,
    handleSortingChange,
    handlePageSizeChange,
    handleCurrentPageChange,
  } = useGridParams();

  async function handleAddRow(
    row: Omit<Customer, 'id' | 'code' | 'createdAt'>
  ) {
    try {
      await onAddCustomer(row);

      toast.success({
        title: 'Cliente adicionado',
        description: row.name,
      });
    } catch (err) {
      toast.danger({
        title: 'Erro ao adicionar o cliente',
        description: row.name,
      });
    }
  }

  async function handleUpdateRow({
    newRow,
    oldRow,
  }: {
    newRow: Customer;
    oldRow: Customer;
  }) {
    try {
      await onUpdateCustomer(newRow);

      toast.success({
        title: 'Cliente alterado',
        description: newRow.name,
      });
    } catch (err) {
      toast.danger({
        title: 'Erro ao alterar o cliente',
        description: oldRow.name,
      });
    }
  }

  async function handleDeleteRow(row: Customer) {
    try {
      await onDeleteCustomer(row.id);

      toast.success({
        title: 'Cliente deletado',
        description: row.name,
      });
    } catch (err) {
      toast.danger({
        title: 'Erro ao deletar o cliente',
        description: row.name,
      });
    }
  }

  return (
    <DataGrid<Customer>
      title="Clientes"
      rows={customers}
      columns={columns}
      getRowId={({ id }) => id}
      loading={isLoading}
      addRowLoading={isAddCustomerLoading}
      onAddRow={handleAddRow}
      onUpdateRow={handleUpdateRow}
      onDeleteRow={handleDeleteRow}
      addAndEditModalContent={CustomerAddAndEditModal}
      pageSize={pageSize}
      onPageSizeChange={handlePageSizeChange}
      currentPage={page}
      onCurrentPageChange={handleCurrentPageChange}
      onSortingChange={handleSortingChange}
      sorting={sorting}
      deleteModalContent={CustomerDeleteModal}
      rowActions={CustomerRowActions}
      columnFormatters={[
        {
          columns: ['createdAt'],
          component: DataGridColumnFormatter.Date,
        },
      ]}
      searchInputId="name"
      fetched={isFetched}
    />
  );
}
