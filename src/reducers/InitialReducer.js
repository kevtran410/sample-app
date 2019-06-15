import { Constant } from '../common';

const { GET_USER, REFRESHING_ACCESS_TOKEN } = Constant.login;

const INITIAL_STATE = {
  accessToken: null,
  refreshToken: null,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER: {
      const { accessToken, refreshToken } = action.payload.tokens;
      return {
        ...state,
        accessToken,
        refreshToken: refreshToken || state.refreshToken,
      };
    }
    case REFRESHING_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};

export default auth;
