import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import { View, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
// import { BottomBar, Header } from './app/features/common';
import { Constant } from './src/common';
// import { translate } from './src/i18n';
import NavigatorServices from './src/services/navigator';

import InitialContainer from './src/containers/InitialContainer';
// import LoginContainer from './src/containers/LoginContainer';
// import HomeContainer from './src/containers/HomeContainer';

const {
  InitialScreen,
  HomeScreen,
  Screen1,
  Screen2,
  Screen3,
  Screen4,
} = Constant.routeName;

const AuthStack = createStackNavigator({
  Login: LoginContainer,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeContainer,
    Screen1: Screen1Container,
    Screen2: Screen2Container,
    Screen3: Screen3Container,
  },
  {
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
    },
    tabBarComponent: BottomBar,
  }
);

const AppStack = createStackNavigator(
  {
    Tab: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        switch (navigation.state.routes[navigation.state.index].routeName) {
          case DashboardTab:
            return {
              title: translate('dashboardScreen.title'),
            };
          case ProfileTab:
            return {
              title: translate('profileScreen.title'),
            };
          case ProjectTab:
            return {
              title: translate('projectScreen.title'),
            };
          default:
            break;
        }
      },
    },
  },
  {
    // mode: 'modal',
    defaultNavigationOptions: {
      header: props => <Header {...props} showBottomBorder />,
    },
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Initial: InitialContainer,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: InitialScreen,
    }
  )
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <AppContainer
            ref={navigatorRef => {
              NavigatorServices.setContainer(navigatorRef);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}
