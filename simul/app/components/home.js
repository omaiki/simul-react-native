import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Home extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>HOME PAGE YA</Text>
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

module.exports = Home;