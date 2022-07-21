import {configureStore} from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import bloodsugarReducer from './features/tabs/bloodSugarSlice';
import bloodPressureSlice from './features/tabs/bloodPressureSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bloodSugar: bloodsugarReducer,
    bloodPressure: bloodPressureSlice,
  },
});
