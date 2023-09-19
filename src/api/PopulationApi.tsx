import axios from 'axios';
import {useDispatch} from 'react-redux';
import {
  setAllStatesData,
  setPopulationData,
  setSpecificState,
} from '../redux/populationSlice';
import {
  StatePopulationData,
  StatePopulationDataApiResponse,
} from '../utils/types';
import Toast from 'react-native-toast-message';

const BASE_URL = 'https://datausa.io/api/data';
const DEFAULT_YEAR = '2015,2016,2019,2020';

const fetchData = async <T,>(
  url: string,
  successAction: (data: T) => void,
  errorAction: (error: Error) => void,
) => {
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      successAction(data);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error: any) {
    errorAction(error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  }
};

export const useFetchNation = () => {
  const dispatch = useDispatch();

  return async () => {
    const url = `${BASE_URL}?drilldowns=Nation&measures=Population&year=${DEFAULT_YEAR}`;
    fetchData<StatePopulationDataApiResponse>(
      url,
      data => dispatch(setPopulationData(data.data)),
      error => console.error('Error fetching data:', error),
    );
  };
};

export const useFetchStates = () => {
  const dispatch = useDispatch();

  return async () => {
    const url = `${BASE_URL}?drilldowns=State&measures=Population&year=${DEFAULT_YEAR}`;
    fetchData<StatePopulationDataApiResponse>(
      url,
      data => dispatch(setAllStatesData(data.data)),
      error => console.error('Error fetching state data:', error),
    );
  };
};

export const useFetchSpecificState = (stateName: string, year?: number) => {
  const dispatch = useDispatch();

  return async () => {
    const stateIdResponse = await axios.get(
      `${BASE_URL}?measure=Population&drilldowns=State`,
    );

    const stateData = stateIdResponse.data.data.find(
      (state: StatePopulationData) => state.State === stateName,
    );

    if (!stateData) {
      throw new Error(`State '${stateName}' not found.`);
    }

    const stateId = stateData['ID State'];
    const apiUrl = `${BASE_URL}?Geography=${stateId}&measure=Population&drilldowns=State&Year=${
      year || DEFAULT_YEAR
    }`;

    fetchData<StatePopulationDataApiResponse>(
      apiUrl,
      data => dispatch(setSpecificState(data.data)),
      error => console.error(`Error fetching data for ${stateName}:`, error),
    );
  };
};
