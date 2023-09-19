import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PopulationState} from '../utils/types';
import BarChart from '../components/BarChart';
import {useFetchStates} from '../api/PopulationApi';
import {setCompareStates} from '../redux/populationSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import ChartSelectButton from '../components/ChartSelectButton';

const CompareScreen = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const fetchAllState = useFetchStates();
  const allStatesData = useSelector(
    (state: {population: PopulationState}) => state.population.allStatesData,
  );
  const compareStates = useSelector(
    (state: {population: PopulationState}) => state.population.compareStates,
  );
  const items = allStatesData?.map(state => ({
    label: state.State,
    value: state.State,
  }));

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllState();
  }, []);

  useEffect(() => {}, [value]);

  const handleCompare = async () => {
    setIsLoading(true);

    try {
      const updatedFoundStates = await Promise.all(
        value.map(async stateName => {
          const foundState = allStatesData?.find(
            state => state.State === stateName,
          );
          return foundState || null;
        }),
      );

      const filteredFoundStates = updatedFoundStates.filter(
        state => state !== null,
      );

      dispatch(setCompareStates(filteredFoundStates));
    } catch (error) {
      console.error('Error comparing states:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uniqueKey = `dropdown-${Date.now()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Two States to Compare:</Text>
        <DropDownPicker
          itemKey={uniqueKey}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          multiple={true}
          max={4}
          mode="BADGE"
          badgeDotColors={[
            '#e76f51',
            '#00b4d8',
            '#e9c46a',
            '#e76f51',
            '#8ac926',
            '#00b4d8',
            '#e9c46a',
          ]}
          theme="DARK"
        />
        <View style={styles.chartButton}>
          <ChartSelectButton text="Compare" onPress={handleCompare} />
        </View>
      </View>
      <View style={styles.chartContainer}>
        <BarChart data={compareStates} isCompare={true} />
      </View>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : compareStates?.length === 0 ? (
        <Text style={styles.noMatchingText}>No matching states found.</Text>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  chartButton: {alignItems: 'center'},
  content: {
    paddingHorizontal: 15,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  chartContainer: {
    paddingHorizontal: 15,
    zIndex: 5,
  },
  loadingText: {
    textAlign: 'center',
    color: 'white',
  },
  noMatchingText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default CompareScreen;
