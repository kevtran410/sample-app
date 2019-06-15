import Config from 'react-native-config';

export default {
  API: {
    BASE_URL: Config.API_BASE_URL,
    HEADERS: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};
