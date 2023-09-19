import React, {useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {PopulationState} from '../utils/types';
import {useFetchNation, useFetchStates} from '../api/PopulationApi';
import ChartSelectButton from '../components/ChartSelectButton';
import {useNavigation} from '@react-navigation/native';
import BarChart from '../components/BarChart';

const HomeScreen = () => {
  const nation = useSelector(
    (state: {population: PopulationState}) => state.population.data,
  );
  const fetchAllState = useFetchStates();
  const fetchNation = useFetchNation();
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllState();
    fetchNation();
  }, []);

  const handleNavigation = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BarChart data={nation} isNation={true} />
        <View style={styles.buttonsContainer}>
          <ChartSelectButton
            text="State Population Details"
            onPress={() => handleNavigation('Detail')}
          />
          <ChartSelectButton
            text="Compare States Populations"
            onPress={() => handleNavigation('Compare')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
});

export default HomeScreen;
