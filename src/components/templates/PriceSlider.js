import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const PriceSlider = ({range, onChange}) => {
  return (
    <View style={styles.container}>
      <MultiSlider
        values={range}
        onValuesChange={onChange}
        min={0}
        max={1000}
        step={10}
        allowOverlap={false}
        snapped
        selectedStyle={{backgroundColor: '#6a380f'}}
        markerStyle={{backgroundColor: '#6a380f'}}
      />
    </View>
  );
};

export default PriceSlider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
});
