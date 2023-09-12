import { faker } from '@faker-js/faker/locale/pt_BR';

import { PurchaseHistory } from '@/models/purchase-history';

import { customers } from './customers';

export const purchasesHistory: PurchaseHistory[] = seed(25);

function seed(length = 10): PurchaseHistory[] {
  return Array.from({ length }).map(() => ({
    id: faker.datatype.uuid(),
    purchaseDate: faker.date.past().toISOString(),
    amount: faker.finance.amount(100, 1000),
    method: faker.helpers.arrayElement(['credit_card', 'debit_card', 'money']),
    customerID: faker.helpers.arrayElement([
      ...customers.map(customer => customer.id),
    ]),
  }));
}
