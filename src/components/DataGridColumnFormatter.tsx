import { purchaseHistoryMethod } from '@/models/purchase-history';
import { purchasesHistoryMethodLabel } from '@/constants';

function DateFormat({ value }: { value: string }) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return <span>{Intl.DateTimeFormat('pt-BR').format(date)}</span>;
}

function CurrencyFormat({ value }: { value: number }) {
  return (
    <span>
      {Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)}
    </span>
  );
}

function NumberFormat({ value }: { value: number }) {
  return <span>{Intl.NumberFormat('pt-BR').format(value)} </span>;
}

function PaymentMethodFormat({ value }: { value: purchaseHistoryMethod }) {
  return <span>{purchasesHistoryMethodLabel[value]}</span>;
}

export const DataGridColumnFormatter = {
  Date: DateFormat,
  Currency: CurrencyFormat,
  Number: NumberFormat,
  PaymentMethod: PaymentMethodFormat,
};
