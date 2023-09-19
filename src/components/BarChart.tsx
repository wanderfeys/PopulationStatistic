import React, {FC} from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import Bar from './Bar';
import {StatePopulationData} from '../utils/types';
import {titleHeader, shortenNumber} from '../utils/utils';

interface BarChartProps {
  data: StatePopulationData[] | null;
  isCompare?: boolean;
  isNation?: boolean;
}

const BarChart: FC<BarChartProps> = ({
  data,
  isCompare = false,
  isNation = false,
}) => {
  const chartHeight = 200;
  const {width} = useWindowDimensions();
  const margin = 4;

  const calculateBarHeight = (population: number) => {
    // Define the maximum population value (e.g., 39346023)
    const maxPopulation = isNation ? 439346023 : 39346023;

    // Calculate the scaled bar height based on the population
    const scaledHeight = (population / maxPopulation) * chartHeight;

    // Ensure the scaled height does not exceed the chart's maximum height
    return Math.min(scaledHeight, chartHeight);
  };

  const calculateBarWidth = () => {
    if (!data) {
      return 50;
    }
    return width / data?.length - margin * 5;
  };

  return (
    <View>
      {data != null && data.length > 0 ? (
        <Text style={styles.title}>
          Population in {isCompare ? 'states' : titleHeader(data[0])}
        </Text>
      ) : (
        <></>
      )}

      <View style={styles.container}>
        {data?.map((state: StatePopulationData, index: number) => {
          const barHeight = calculateBarHeight(state?.Population);
          const barWidth = calculateBarWidth();
          return (
            <View key={index.toString()} style={{marginRight: 2 * margin}}>
              <Bar
                barMargin={margin}
                barHeight={barHeight}
                barWidth={barWidth}
                totalHeight={chartHeight}
                compareLabel={state?.State ?? ''}
                label={shortenNumber(state?.Population)}
              />
              <Text style={styles.text}>{state.Year} year</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    paddingTop: 12,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 30,
  },
});

export default BarChart;
