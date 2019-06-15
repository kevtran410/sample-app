import axios from 'axios';
import Config from '../api/config';
import { store } from '../store';
import { Constant } from '../common';
import NavigatorServices from '../services/navigator';

const { REFRESHING_ACCESS_TOKEN, USER_LOGOUT } = Constant.login;
const { InitialScreen } = Constant.routeName;
let isRefreshingToken = false;

const axiosInstance = axios.create();

const parse = (baseUrl, endpoint, params) =>
  baseUrl +
  Config.API[endpoint].url.replace(
    /\{(.+?)\}/g,
    (match, str, ind, self) => params[str]
  );

axiosInstance.interceptors.response.use(null, async error => {
  const {
    config,
    response: { status },
  } = error;
  const originalRequest = config;

  if (status === 401) {
    if (!isRefreshingToken) {
      isRefreshingToken = true;
      try {
        const refreshToken = store.getState().auth.refreshToken;
        const response = await req(REFRESHING_ACCESS_TOKEN, {
          data: {
            refresh_token: refreshToken,
          },
          method: 'post',
          requireToken: false,
        });
        const accessToken = response.data.access_token;
        store.dispatch({
          type: REFRESHING_ACCESS_TOKEN,
          payload: {
            accessToken,
          },
        });
        isRefreshingToken = false;
        return new Promise(resolve => {
          originalRequest.headers.Authorization = 'Bearer ' + accessToken;
          resolve(axiosInstance(originalRequest));
        });
      } catch (e) {
        isRefreshingToken = false;
        store.dispatch({
          type: USER_LOGOUT,
        });
        NavigatorServices.navigate(InitialScreen);
        return Promise.reject(e);
      }
    }
  }
  return Promise.reject(error);
});

export default (req = async (
  endpoint,
  {
    baseUrl = Config.API.BASE_URL,
    params = null,
    data = null,
    customHeaders = null,
    contentType = null,
    method = 'get',
    requireToken = true,
  } = {}
) => {
  const accessToken = store.getState().auth.accessToken;
  const headers = {
    ...Config.API.HEADERS,
    ...customHeaders,
  };

  headers['Content-Type'] = contentType || headers['Content-Type'];

  if (requireToken && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const url = parse(baseUrl, endpoint, params);
  return axiosInstance({
    method,
    url,
    headers,
    data,
  });
});
