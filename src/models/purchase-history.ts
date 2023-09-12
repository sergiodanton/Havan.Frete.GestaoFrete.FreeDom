export enum purchaseHistoryMethod {
  MONEY = 'money',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
}

export type PurchaseHistory = {
  id: string;
  purchaseDate: string;
  amount: string;
  method: string;
  customerID: string;
};

export type PurchaseHistoryGetResponse = {
  purchasesHistory: PurchaseHistory[];
};
