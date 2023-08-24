import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderWidth: 0.4,
    borderColor: '#BD2D35',
  },
});
