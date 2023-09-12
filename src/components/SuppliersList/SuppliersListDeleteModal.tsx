import { DeleteModalProps } from '@freedom/react-components';

import { Supplier } from '@/models/supplier';

export function SuppliersListDeleteModal({ row }: DeleteModalProps<Supplier>) {
  return (
    <p>
      Deseja mesmo deletar <strong>{row.businessName}?</strong>
    </p>
  );
}
