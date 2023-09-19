import React, {useEffect} from 'react';
import {SafeAreaView, View, Dimensions, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {PopulationState} from '../utils/types';
import BarChart from '../components/BarChart';
import BottomSheetComponent from '../components/BottomSheet';

const screenHeight = Dimensions.get('screen').height;

const DetailScreen = () => {
  const specificState = useSelector(
    (state: {population: PopulationState}) => state.population.specificState,
  );

  useEffect(() => {}, [specificState]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BarChart data={specificState} />
      </View>
      <BottomSheetComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    height: screenHeight,
  },
  content: {
    paddingHorizontal: 15,
    zIndex: 10,
  },
});

export default DetailScreen;
