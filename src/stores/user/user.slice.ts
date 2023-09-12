import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/models/user';
import { getUserInfoFromJwt } from '@/helpers/auth.helpers';

const initialState: User = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (_state, action: PayloadAction<string>) => {
      const token = action.payload;

      return getUserInfoFromJwt(token);
    },
  },
});

export const { register } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
