import apisauce from 'apisauce'
import { merge } from 'ramda'
import { UrlEncode } from 'Lib/RamdaExtensions'
import store from 'store'

export default {
  create: (baseURL = 'http://localhost:1339/') => {
    const tokenData = store.get('tokenData')
    const accessToken = tokenData ? tokenData.accessToken : ''
    const api = apisauce.create({
      baseURL,
      headers: {
        Origin: 'https://api.amrtravels.in',
        'Content-Type': 'application/json'
      },
      headers: { Authorization: `Bearer ${accessToken}` },
      timeout: 100000
    })

    return {
      setAuthToken: token => api.setHeader('Authorization', `Bearer ${token}`),
      deleteAuthToken: () => api.deleteHeader('Authorization'),
      signup: params => api.post('signup', params),
      login: params =>
        api.post(
          'oauth/token',
          UrlEncode(
            merge(
              {
                grant_type: 'password',
                client_id: 'amr-mobile-client-id',
                scope: 'all'
              },
              params
            )
          ),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }
        ),
      me: () => api.get('users/me'),
      getFlights: () => api.get('flights'),
      getTickets: _ => api.get('tickets'),
      createTicket: params => api.post('tickets', params),
      updateTicket: (ticketId, params) => api.put(`tickets/${ticketId}`, params)
    }
  }
}
