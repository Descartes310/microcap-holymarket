import axios from 'axios';
import AppConfig from 'Constants/AppConfig';
import {getAuthToken} from "Helpers/tokens";
import {NotificationManager} from "react-notifications";
import {ERROR_500, ERROR_401, ERROR_403, ERROR_404, ERROR_UNKNOWN} from 'Data/errors';
import {errorManager, objectToFormData, toCamelCase, toSnakeCase} from "Helpers/helpers";

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

          if (config.multipart) {
              config.headers['content-type'] = 'multipart/form-data';
          }

          // Check if post or put to perform some operation
          if ((config.method === 'post' || config.method === 'put') && !config.shouldSkipDataParsing) {
              // Create an object to store file data
              const fileData = {};

              // Check if fileData is present
              if (config.fileData) {
                  config.fileData.forEach(f => {
                      fileData[f] = config.data[f];
                      delete config.data[f];
                  });
              }
              // Parse object to snakeCase and Form data
              const data = toSnakeCase(config.data);
              config.data = objectToFormData(data);

              // Append files to data to send
              if (config.fileData) {
                  Object.entries(fileData).forEach(item => {
                      config.data.append(item[0], item[1]);
                  });
              }
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
    },
    error => {
        const originalRequest = error.config;
        // if (error) {
        //     if (error.response) {
        //         if (!originalRequest.skipError) {
        //             switch (error.response.status) {
        //                 case 400:
        //                     errorManager(error.response.data.errorss);
        //                     return Promise.reject(error);
        //                 case 401:
        //                     NotificationManager.error(ERROR_401);
        //                     return Promise.reject(error);
        //                 case 403:
        //                     NotificationManager.error(ERROR_403);
        //                     return Promise.reject(error);
        //                 case 404:
        //                     NotificationManager.error(ERROR_404);
        //                     return Promise.reject(error);
        //                 case 500:
        //                     NotificationManager.error(ERROR_500);
        //                     return Promise.reject(error);
        //                 default:
        //                     NotificationManager.error(ERROR_500);
        //                     return Promise.reject(error);
        //             }
        //         }
        //     } else if (!originalRequest.skipError) NotificationManager.error(ERROR_UNKNOWN);
        // } else if (!originalRequest.skipError) NotificationManager.error(ERROR_UNKNOWN);

        return Promise.reject(error);
    });

export default customAxios;
