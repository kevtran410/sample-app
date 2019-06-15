import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import imageResources from '../assets';
import { Constant } from '../common';

const {
  HomeScreen,
  Screen1,
  Screen2,
  Screen3,
} = Constant.routeName;

export class BottomBar extends Component {
  renderItem = (route, index) => {
    const { navigation, jumpTo } = this.props;

    const focused = index === navigation.state.index;
    return (
      <TouchableWithoutFeedback
        key={route.key}
        onPress={() => {
          jumpTo(route.key);
        }}
      >
        <View style={styles.tab}>
          <Icon
            name={this.getIcon(route.key, focused)}
            size={28}
            color={'#535353'}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  getIcon = (key, focused) => {
    switch (key) {
      default:
        return null;
      case HomeScreen:
        return focused
          ? imageResources.iconNames.home
          : imageResources.iconNames.homeOutline;
      case Screen1:
        return focused
          ? imageResources.iconNames.person
          : imageResources.iconNames.personOutline;
      case Screen2:
        return imageResources.iconNames.add;
      case Screen3:
        return focused
          ? imageResources.iconNames.project
          : imageResources.iconNames.projectOutline;
    }
  };

  render() {
    const { navigation } = this.props;

    const { routes } = navigation.state;

    return (
      <SafeAreaView style={styles.tabBar}>
        {routes && routes.map(this.renderItem)}
      </SafeAreaView>
    );
  }
}

const styles = {
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
