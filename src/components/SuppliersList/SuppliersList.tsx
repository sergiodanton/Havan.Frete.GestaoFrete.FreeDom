import { DataGrid, DataGridColumn } from '@freedom/react-components';

import { Supplier } from '@/models/supplier';
import { useGridParams } from '@/hooks/useGridParams';
import { usePermission } from '@/hooks/usePermission';

import { SuppliersListDeleteModal } from './SuppliersListDeleteModal';

type SuppliersListProps = {
  suppliers: Supplier[];
  isLoading?: boolean;
};

const columns: DataGridColumn<Supplier>[] = [
  {
    name: 'businessName',
    title: 'Nome fantasia',
  },
  {
    name: 'cnpj',
    title: 'CNPJ',
  },
  {
    name: 'address',
    title: 'Endereço',
  },
];

export function SuppliersList({ suppliers, isLoading }: SuppliersListProps) {
  const { hasPermission, isLoading: isLoadingPermission } = usePermission(
    'FN_DELETARFORNECEDOR'
  );

  const {
    pageSize,
    page,
    sorting,
    handleSortingChange,
    handlePageSizeChange,
    handleCurrentPageChange,
  } = useGridParams();

  return (
    <DataGrid<Supplier>
      enableSelection
      striped
      title="Fornecedores"
      loading={isLoading || isLoadingPermission}
      columns={columns}
      rows={suppliers}
      getRowId={row => row.id}
      sorting={sorting}
      onSortingChange={handleSortingChange}
      currentPage={page}
      onPageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
      onCurrentPageChange={handleCurrentPageChange}
      deleteModalContent={SuppliersListDeleteModal}
      hasDeletePermission={hasPermission}
    />
  );
}
