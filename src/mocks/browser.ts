/* eslint-disable import/namespace */
import { RestHandler, setupWorker } from 'msw';

import { defaultHandlers } from './default-handlers';
import * as customersHandlers from './handlers/customers';
import * as suppliersHandlers from './handlers/suppliers';
import * as purchasesHistoryHandlers from './handlers/purchases-history';

const SCENARIOS_QUERY_PARAM = 's';

const urlSearchParams = new URLSearchParams(window.location.search);
const requestedScenarios = urlSearchParams
  .get(SCENARIOS_QUERY_PARAM)
  ?.split(',');

const scenarioHandlers: RestHandler[] =
  requestedScenarios?.map(
    s =>
      // @ts-ignore
      customersHandlers[s] ||
      // @ts-ignore
      suppliersHandlers[s] ||
      // @ts-ignore
      purchasesHistoryHandlers[s]
  ) || [];

export const worker = setupWorker(...scenarioHandlers, ...defaultHandlers);
