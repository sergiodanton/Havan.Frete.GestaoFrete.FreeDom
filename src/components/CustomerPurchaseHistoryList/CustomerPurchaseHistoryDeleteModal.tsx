import { DeleteModalProps } from '@freedom/react-components';

import { PurchaseHistory } from '@/models/purchase-history';

export function CustomerPurchaseHistoryDeleteModal({
  row,
}: DeleteModalProps<PurchaseHistory>) {
  return (
    <p>
      Deseja mesmo deletar <strong>{row.id}?</strong>
    </p>
  );
}
