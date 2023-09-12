import axios from 'axios';

import { HAVAN_ENV_API_USERS } from '@/constants';

export const usersApi = axios.create({
  baseURL: HAVAN_ENV_API_USERS,
});
