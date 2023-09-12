import { ENVIRONMENT } from '@/constants';

export function isDev() {
  return ENVIRONMENT === 'development';
}
