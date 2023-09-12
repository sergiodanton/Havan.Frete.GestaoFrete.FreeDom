import { Link } from 'react-router-dom';

import { Customer } from '@/models/customer';

export function CustomerRowActions(row: Customer) {
  return [
    <Link to={`${row?.id}/historico-de-compras`}>Histórico de compras</Link>,
  ];
}
