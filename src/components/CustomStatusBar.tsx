import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CustomStatusBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{height: insets.top, backgroundColor: '#F7FFF7'}}>
      <StatusBar
        animated={true}
        backgroundColor={'#EEE5E9'}
        barStyle={'dark-content'}
      />
    </View>
  );
};
