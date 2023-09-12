import {
  getCustomers200,
  postCustomer200,
  patchCustomer200,
  deleteCustomer204,
  getCustomer200,
} from './handlers/customers';
import {
  getCustomerPurchasesHistory200,
  deleteCustomerPurchasesHistory204,
} from './handlers/purchases-history';
import { getSuppliers200 } from './handlers/suppliers';

export const defaultHandlers = [
  getCustomers200,
  getCustomer200,
  postCustomer200,
  patchCustomer200,
  deleteCustomer204,
  getSuppliers200,
  getCustomerPurchasesHistory200,
  deleteCustomerPurchasesHistory204,
];
