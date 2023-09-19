import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/Navigator';
import {CustomStatusBar} from './src/components/CustomStatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
