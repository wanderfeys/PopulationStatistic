/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CompareScreen from '../screens/CompareScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: 'Population Statistic',
            headerTitleStyle: {
              fontWeight: '300',
              fontStyle: 'italic',
              fontSize: 30,
            },
            headerStyle: {
              backgroundColor: '#F7FFF7',
            },
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerTitle: '',
            headerBackTitle: '',
            headerTruncatedBackTitle: '',
            headerLeftContainerStyle: {
              marginBottom: 20,
            },
            headerTintColor: '#111827',
          }}
        />
        <Stack.Screen
          name="Compare"
          component={CompareScreen}
          options={{
            headerTitle: '',
            headerBackTitle: '',
            headerTruncatedBackTitle: '',
            headerLeftContainerStyle: {
              marginBottom: 20,
            },
            headerTintColor: '#111827',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
