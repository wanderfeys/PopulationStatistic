import React, {FC} from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

interface ChartSelectButtonProps {
  text: string;
  onPress: () => void;
}

const ChartSelectButton: FC<ChartSelectButtonProps> = ({text, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={text}
      hitSlop={10}
      style={({pressed}) => [
        styles.buttonContainer,
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 8,
    marginBottom: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
  },
});

export default ChartSelectButton;
