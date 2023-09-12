import { rest, RestHandler } from 'msw';

import { SupplierGetResponse } from '@/models/supplier';
import { SUPPLIERS_API_URL } from '@/hooks/useSuppliers';

import { suppliers } from '../data/suppliers';

export const getSuppliers200: RestHandler = rest.get<SupplierGetResponse>(
  `*${SUPPLIERS_API_URL}`,
  async (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(), ctx.json({ suppliers }))
);

export const getSuppliersSlow200: RestHandler = rest.get<SupplierGetResponse>(
  `*${SUPPLIERS_API_URL}`,
  async (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(10000), ctx.json({ suppliers }))
);

export const getSuppliersVerySlow200: RestHandler =
  rest.get<SupplierGetResponse>(
    `*${SUPPLIERS_API_URL}`,
    async (req, res, ctx) =>
      res(ctx.status(200), ctx.delay(30000), ctx.json({ suppliers }))
  );

export const getSuppliersEmpty200: RestHandler = rest.get<SupplierGetResponse>(
  `*${SUPPLIERS_API_URL}`,
  async (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(), ctx.json({ suppliers: [] }))
);

export const getSuppliers400: RestHandler = rest.get<SupplierGetResponse>(
  `*${SUPPLIERS_API_URL}`,
  (req, res, ctx) => res(ctx.status(400), ctx.delay(), ctx.json({}))
);

export const getSuppliers500: RestHandler = rest.get<SupplierGetResponse>(
  `*${SUPPLIERS_API_URL}`,
  (req, res, ctx) => res(ctx.status(500), ctx.delay(), ctx.json({}))
);
