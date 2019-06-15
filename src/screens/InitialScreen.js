import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class InitialScreen extends Component {
  componentDidMount() {
    if (this.props.accessToken) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
