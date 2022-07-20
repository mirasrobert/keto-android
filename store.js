import {configureStore} from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import bloodsugarReducer from './features/tabs/bloodSugarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bloodSugar: bloodsugarReducer,
  },
});
