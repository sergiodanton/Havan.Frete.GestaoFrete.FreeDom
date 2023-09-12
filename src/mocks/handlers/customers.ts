import { rest, RestHandler } from 'msw';
import { faker } from '@faker-js/faker';

import {
  Customer,
  CustomerGetResponse,
  CustomerPostRequestPayload,
  CustomerType,
} from '@/models/customer';
import { CUSTOMERS_API_URL } from '@/hooks/useCustomer';
import { customers } from '@/mocks/data/customers';

export const getCustomers200: RestHandler = rest.get<CustomerGetResponse>(
  `*${CUSTOMERS_API_URL}`,
  async (req, res, ctx) => {
    const { searchParams } = req.url;

    const UFs: string[] = [];

    const name = searchParams.get('name');
    const customerType = searchParams.get(
      'customerType'
    ) as CustomerType | null;
    const createdAt = searchParams.get('createdAt');

    for (const key of searchParams.keys()) {
      const UF = searchParams.get(key);

      if (key.includes('UFs') && !!UF) {
        UFs.push(UF);
      }
    }

    const filteredCustomers = customers
      .filter(customer => {
        if (name) {
          const reg = new RegExp(name, 'ig');

          return reg.test(customer.name);
        }

        return true;
      })
      .filter(customer => {
        if (UFs.length) {
          return UFs.includes(customer.UF);
        }

        return true;
      })
      .filter(customer => {
        if (customerType) {
          return customer.customerType === Number(customerType);
        }

        return true;
      })
      .filter(customer => {
        if (createdAt) {
          return customer.createdAt === createdAt;
        }

        return true;
      });

    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json({ customers: filteredCustomers })
    );
  }
);

export const getCustomer200: RestHandler = rest.get<Customer>(
  `*${CUSTOMERS_API_URL}/:id`,
  async (req, res, ctx) => {
    const { id } = req.params;

    const customer = customers.find(c => c.id === id);

    if (!customer) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.delay(), ctx.json(customer));
  }
);

export const postCustomer200: RestHandler = rest.post(
  `*${CUSTOMERS_API_URL}`,
  async (req, res, ctx) => {
    const { customer } = await req.json<CustomerPostRequestPayload>();

    const newCustomer: Customer = {
      ...customer,
      id: faker.datatype.uuid(),
      code: faker.datatype.number({ min: 100000, max: 999999 }),
      createdAt: new Date().toISOString(),
    };

    customers.push(newCustomer);

    return res(ctx.status(200), ctx.delay(), ctx.json(newCustomer));
  }
);

export const postCustomer500: RestHandler = rest.post(
  `*${CUSTOMERS_API_URL}`,
  (req, res, ctx) => res(ctx.status(500), ctx.delay(), ctx.json({}))
);

export const patchCustomer200: RestHandler = rest.patch(
  `*${CUSTOMERS_API_URL}/:id`,
  async (req, res, ctx) => {
    const { customer } = await req.json();
    const { id } = req.params;

    const customerIndex = customers.findIndex(c => c.id === id);

    if (customerIndex === -1) {
      return res(ctx.status(404));
    }

    customers[customerIndex] = {
      ...customers[customerIndex],
      ...customer,
    };

    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json(customers[customerIndex])
    );
  }
);

export const deleteCustomer204: RestHandler = rest.delete(
  `*${CUSTOMERS_API_URL}/:id`,
  async (req, res, ctx) => {
    const { id } = req.params;

    const customerIndex = customers.findIndex(c => c.id === id);

    if (customerIndex === -1) {
      return res(ctx.status(404));
    }

    customers.splice(customerIndex, 1);

    return res(ctx.status(200), ctx.delay(), ctx.json({}));
  }
);
