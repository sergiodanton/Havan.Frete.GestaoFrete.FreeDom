import { RootState } from '@/stores/store';

export function getUser(state: RootState) {
  return state.user;
}
