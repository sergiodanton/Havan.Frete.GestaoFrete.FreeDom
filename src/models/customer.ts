export enum CustomerType {
  PESSOA_FISICA = 1,
  PESSOA_JURIDICA = 2,
}

export type Customer = {
  id: string;
  code: number;
  name: string;
  city: string;
  UF: string;
  customerType: CustomerType;
  createdAt: string;
};

export type CustomerGetResponse = {
  customers: Customer[];
};

export type CustomerPostRequestPayload = {
  customer: Omit<Customer, 'id' | 'code'>;
};
