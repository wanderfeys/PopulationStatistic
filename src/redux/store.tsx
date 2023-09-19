import {configureStore} from '@reduxjs/toolkit';
import populationReducer from './populationSlice';

const store = configureStore({
  reducer: {
    population: populationReducer,
  },
});

export default store;
