import { NavigationActions } from 'react-navigation';

let _container;

const setContainer = container => {
  _container = container;
};

const reset = (routeName, params) => {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    })
  );
};

const navigate = (routeName, params) => {
  _container.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    })
  );
};

export default {
  setContainer,
  navigate,
  reset,
};
