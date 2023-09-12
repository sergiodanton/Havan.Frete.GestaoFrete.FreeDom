import { DataGrid, DataGridColumn } from '@freedom/react-components';

import { DataGridColumnFormatter } from '@/components/DataGridColumnFormatter';
import { useGridParams } from '@/hooks/useGridParams';
import { PurchaseHistory } from '@/models/purchase-history';

import { CustomerPurchaseHistoryDeleteModal } from './CustomerPurchaseHistoryDeleteModal';

type CustomerPurchaseHistoryListProps = {
  purchasesHistory: PurchaseHistory[];
  isLoading: boolean;
  isFetched: boolean;
  onDeletePurchaseHistory: (id: string) => void;
};

const columns: DataGridColumn<PurchaseHistory>[] = [
  {
    name: 'purchaseDate',
    title: 'Data de compra',
    align: 'center',
  },
  {
    name: 'method',
    title: 'Método de pagamento',
  },
  {
    name: 'amount',
    title: 'Total',
    align: 'right',
  },
];

export function CustomerPurchaseHistoryList({
  purchasesHistory,
  isLoading,
  onDeletePurchaseHistory,
  isFetched,
}: CustomerPurchaseHistoryListProps) {
  const {
    pageSize,
    page,
    sorting,
    handleSortingChange,
    handlePageSizeChange,
    handleCurrentPageChange,
  } = useGridParams();

  function handleDeleteRow(row: PurchaseHistory) {
    onDeletePurchaseHistory(row.id);
  }

  return (
    <DataGrid<PurchaseHistory>
      enableSelection
      separatorX
      separatorY
      title="Histórico de compras"
      loading={isLoading}
      fetched={isFetched}
      columns={columns}
      rows={purchasesHistory}
      getRowId={row => row.id}
      sorting={sorting}
      onSortingChange={handleSortingChange}
      currentPage={page}
      onPageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
      onCurrentPageChange={handleCurrentPageChange}
      onDeleteRow={handleDeleteRow}
      deleteModalContent={CustomerPurchaseHistoryDeleteModal}
      columnFormatters={[
        {
          columns: ['purchaseDate'],
          component: DataGridColumnFormatter.Date,
        },
        {
          columns: ['amount'],
          component: DataGridColumnFormatter.Currency,
        },
        {
          columns: ['method'],
          component: DataGridColumnFormatter.PaymentMethod,
        },
      ]}
    />
  );
}
