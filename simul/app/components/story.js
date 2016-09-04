import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Story extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>Story 7</Text>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
   fontSize: 20,
   alignSelf: 'center',
   margin: 40
  },
});

module.exports = Story;