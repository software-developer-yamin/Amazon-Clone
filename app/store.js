import { configureStore } from '@reduxjs/toolkit';
import basketSlice from '../features/basket/basketSlice';

export const store = configureStore({
     reducer: {
          basket: basketSlice,
     },
})