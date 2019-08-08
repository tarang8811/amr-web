import apisauce from 'apisauce';
import R from 'ramda';
// import { UrlEncode } from '@Lib/RamdaExtensions'
// import Config from 'react-native-config'

export default {
  create: (baseURL = '') => {
    const api = apisauce.create({
      baseURL,
      headers: {
        Origin: 'https://api.amrtravels.in',
        'Content-Type': 'application/json'
      },
      timeout: 100000
    });

    return {
      setAuthToken: token => api.setHeader('Authorization', `Bearer ${token}`)
    };
  }
};
