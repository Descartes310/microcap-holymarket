import axios from 'axios';
import AppConfig from 'Constants/AppConfig';
import {objectToFormData, toCamelCase, toSnakeCase} from "Helpers/helpers";
import {getAuthToken} from "Helpers/tokens";

const customAxios =
   axios.create({
      baseURL: AppConfig.api.baseUrl,
      timeout: 15000
   });

customAxios.interceptors.request.use(
    async (config) => {
       try {
          // Get auth token
          const { accessToken } = getAuthToken();

          if (accessToken && !config.shouldSkipToken) {
             config.headers['Authorization'] = 'Bearer ' + accessToken;
          }

          // Check if post or put to perform some operation
          if ((config.method === 'post' || config.method === 'put') && !config.shouldSkipDataParsing) {
              // Parse object to snakeCase and Form data
              const data = toSnakeCase(config.data);
              config.data = objectToFormData(data);
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
