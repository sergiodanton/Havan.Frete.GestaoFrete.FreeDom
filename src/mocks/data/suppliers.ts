import { faker } from '@faker-js/faker/locale/pt_BR';

import { Supplier } from '@/models/supplier';

export const suppliers: Supplier[] = seed(324);

function seed(length = 10): Supplier[] {
  return Array.from({ length }).map(() => ({
    id: faker.datatype.uuid(),
    businessName: faker.company.name(),
    address: faker.address.streetAddress(),
    cnpj: faker.datatype.uuid(),
    createdAt: faker.date.past().toISOString(),
  }));
}
