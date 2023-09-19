import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PopulationState, StatePopulationData} from '../utils/types';

const initialState: PopulationState = {
  data: [],
  allStatesData: [],
  specificState: [],
  compareStates: [],
};

const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {
    setPopulationData: (
      state,
      action: PayloadAction<StatePopulationData[]>,
    ) => {
      state.data = action.payload;
    },
    setAllStatesData: (state, action: PayloadAction<StatePopulationData[]>) => {
      state.allStatesData = action.payload;
    },
    setSpecificState: (state, action: PayloadAction<StatePopulationData[]>) => {
      state.specificState = action.payload;
    },
    setCompareStates: (state, action) => {
      state.compareStates = action.payload;
    },
  },
});

export const {
  setPopulationData,
  setAllStatesData,
  setSpecificState,
  setCompareStates,
} = populationSlice.actions;
export default populationSlice.reducer;
