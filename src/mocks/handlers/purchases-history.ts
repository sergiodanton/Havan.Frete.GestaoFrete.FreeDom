import { rest, RestHandler } from 'msw';

import { CUSTOMER_PURCHASES_HISTORY_API_URL } from '@/hooks/useCustomerPurchaseHistory';
import { PurchaseHistoryGetResponse } from '@/models/purchase-history';

import { purchasesHistory } from '../data/purchases-history';

export const getCustomerPurchasesHistory200: RestHandler =
  rest.get<PurchaseHistoryGetResponse>(
    `*${CUSTOMER_PURCHASES_HISTORY_API_URL}`,
    async (req, res, ctx) => {
      const purchases = purchasesHistory;

      if (!purchases) {
        return res(ctx.status(404));
      }

      return res(
        ctx.status(200),
        ctx.delay(),
        ctx.json({ purchasesHistory: purchases })
      );
    }
  );

export const deleteCustomerPurchasesHistory204: RestHandler =
  rest.delete<PurchaseHistoryGetResponse>(
    `*${CUSTOMER_PURCHASES_HISTORY_API_URL}`,
    async (req, res, ctx) => {
      const { id } = req.params;

      const purchaseHistoryIndex = purchasesHistory.findIndex(
        purchase => purchase.id === id
      );

      if (purchaseHistoryIndex === -1) {
        return res(ctx.status(404));
      }

      purchasesHistory.splice(purchaseHistoryIndex, 1);

      return res(ctx.status(204), ctx.delay());
    }
  );

export const getCustomerPurchasesHistory404: RestHandler =
  rest.get<PurchaseHistoryGetResponse>(
    `*${CUSTOMER_PURCHASES_HISTORY_API_URL}`,
    async (req, res, ctx) => res(ctx.status(404))
  );

export const deleteCustomerPurchasesHistory500: RestHandler =
  rest.delete<PurchaseHistoryGetResponse>(
    `*${CUSTOMER_PURCHASES_HISTORY_API_URL}`,
    async (req, res, ctx) => res(ctx.status(500), ctx.delay())
  );
