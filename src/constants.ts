import { purchaseHistoryMethod } from '@/models/purchase-history';

/**
 * Isso é muito útil para que os testes não falhem caso haja algum import.meta,
 * sem precissar de configurações complicadas de transpiladores e bundlers.
 * @see: https://stackoverflow.com/questions/72128718/test-suite-failed-to-run-import-meta-env-vite
 */

const {
  MODE: ENVIRONMENT,
  HAVAN_ENV_AUTHORITY,
  HAVAN_ENV_CLIENT_ID,
  HAVAN_ENV_API_USERS,
  HAVAN_ENV_FREEDOM_WEBSITE,
} = import.meta.env;

export {
  ENVIRONMENT,
  HAVAN_ENV_AUTHORITY,
  HAVAN_ENV_CLIENT_ID,
  HAVAN_ENV_API_USERS,
  HAVAN_ENV_FREEDOM_WEBSITE,
};

export const APP_ID = '';
export const APP_NAME = 'Gestão de pessoas';

export const purchasesHistoryMethodLabel = {
  [purchaseHistoryMethod.CREDIT_CARD]: 'Cartão de crédito',
  [purchaseHistoryMethod.DEBIT_CARD]: 'Cartão de débito',
  [purchaseHistoryMethod.MONEY]: 'Dinheiro',
};
