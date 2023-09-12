import { DeleteModalProps } from '@freedom/react-components';

import { Customer } from '@/models/customer';

export function CustomerDeleteModal({ row }: DeleteModalProps<Customer>) {
  return (
    <p>
      Deseja mesmo deletar{' '}
      <strong>
        {row.code} - {row.name}?
      </strong>
    </p>
  );
}
