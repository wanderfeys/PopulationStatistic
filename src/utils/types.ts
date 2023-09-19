export interface PopulationState {
  data: StatePopulationData[] | null;
  allStatesData: StatePopulationData[] | null;
  specificState: StatePopulationData[] | null;
  compareStates: StatePopulationData[] | null;
}

export interface StatePopulationDataApiResponse {
  data: StatePopulationData[];
}

export interface StatePopulationData {
  'ID State': string;
  Geography?: string;
  'ID Year': number;
  Year: string;
  Population: number;
  'Slug State': string;
  State?: string;
  Nation?: string;
}
