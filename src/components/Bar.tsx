import React, {FC, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface BarProps {
  totalHeight: number;
  barHeight: number;
  barWidth: number;
  barMargin: number;
  label: string;
  compareLabel: string;
}

const Bar: FC<BarProps> = ({
  totalHeight,
  barHeight,
  barWidth,
  barMargin,
  label,
  compareLabel,
}) => {
  const animatedHeight = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withTiming(barHeight);
  }, [barHeight, animatedHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <View
      style={[
        styles.container,
        {height: totalHeight, marginLeft: 1.5 * barMargin},
      ]}>
      <Text style={styles.label}>{compareLabel}</Text>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={[styles.bar, {width: barWidth}, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  label: {
    color: 'white',
    textAlign: 'center',
  },
  bar: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
});

export default Bar;
