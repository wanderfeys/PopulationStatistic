import {StatePopulationData} from './types';

export function shortenNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}
export const titleHeader = (item: StatePopulationData) => {
  if (item && item['Geography']) {
    return item['Geography'];
  } else if (item && item['State']) {
    return item['State'];
  } else {
    return 'United States';
  }
};

export const calculateBarRadius = (
  chartRadius: number,
  scale: number,
  margin: number,
  index: number,
  totalItems: number,
) => {
  const angle = (index / totalItems) * 360;
  const radius =
    (chartRadius * scale) /
    (1 + margin * Math.abs(Math.cos((angle * Math.PI) / 180)));
  return radius;
};
