import axios from 'axios';
import AppConfig from 'Constants/AppConfig';
import {toCamelCase, toSnakeCase} from "Helpers/helpers";
import {getAuthToken} from "Helpers/tokens";

const customAxios =
   axios.create({
      baseURL: AppConfig.api.baseUrl,
      timeout: 5000
   });

customAxios.interceptors.request.use(
    async (config) => {
       try {
          // Get auth token
          const { accessToken } = getAuthToken();

          if (accessToken && !config.shouldSkipToken) {
             config.headers['Authorization'] = 'Bearer ' + accessToken;
          }

          if (config.data && !config.shouldSkip) {
             config.data = toSnakeCase(config.data);
          }

          // config.headers['Content-Type'] = 'application/json';
          return config;
       } catch (e) {
          return config;
       }

    },
    error => Promise.reject(error));

customAxios.interceptors.response.use(
    response => {
       if (response && response.data) {
          if (Array.isArray(response.data)) {
             response.data = response.data.map(item => toCamelCase(item));
          } else if (response.data.hasOwnProperty('data')) {
             if (Array.isArray(response.data.data)) {
                // @ts-ignore
                response.data.data = response.data.data.map(item => toCamelCase(item));
             } else response.data.data = toCamelCase(response.data.data);
          } else response.data = toCamelCase(response.data);
       }

       return response;
    });

export default customAxios;
