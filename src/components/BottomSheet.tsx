import React, {useRef, useMemo, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {PopulationState, StatePopulationData} from '../utils/types';
import {useFetchSpecificState} from '../api/PopulationApi';

const BottomSheetComponent = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const allStates = useSelector(
    (state: {population: PopulationState}) => state.population.allStatesData,
  );
  const snapPoints = useMemo(() => ['20%', '100%'], []);
  const [stateName, setStateName] = useState('New York');
  const fetchSpecificStateData = useFetchSpecificState(stateName);

  useEffect(() => {
    fetchSpecificStateData();
  }, [stateName]);

  const handleStateName = (state: string) => {
    setStateName(state);
  };

  const renderItem = ({item}: {item: StatePopulationData}) => (
    <TouchableOpacity
      onPress={() => {
        handleStateName(item?.State);
      }}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item?.State}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
        <BottomSheetFlatList
          data={allStates}
          keyExtractor={item => item?.Population.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 200,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  text: {alignSelf: 'center', color: 'black'},
  itemContainer: {
    height: 40,
    padding: 6,
    margin: 6,
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
  },
});

export default BottomSheetComponent;
