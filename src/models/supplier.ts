export type Supplier = {
  id: string;
  businessName: string;
  cnpj: string;
  address: string;
  createdAt: string;
};

export type SupplierGetResponse = {
  suppliers: Supplier[];
};
