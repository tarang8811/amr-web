import apisauce from 'apisauce'
import { UrlEncode } from 'Lib/RamdaExtensions'
import { merge } from 'ramda'
import store from 'store'

const PROD_URL = 'https://amr-travels.appspot.com/'
const LOCAL_URL = 'http://localhost:1339'

export default {
  create: (baseURL = process.env.API_URL) => {
    const tokenData = store.get('tokenData')
    const accessToken = tokenData ? tokenData.accessToken : ''
    const api = apisauce.create({
      baseURL: PROD_URL,
      headers: {
        Origin: 'https://amr-travels.appspot.com/',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
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
      updateMe: params => api.put(`users/me`, params),
      getUsers: params => api.get('users', params),
      getRoles: params => api.get('roles', params),
      getAccountStatements: params => api.get('account-statements', params),
      changePassword: params => api.put('users/me/password', params),
      updateUser: (userId, params) => api.put(`users/${userId}`, params),
      getFlights: params => api.get('flights', params),
      createFlight: params => api.post('flights', params),
      updateFlight: (flightId, params) =>
        api.put(`flights/${flightId}`, params),
      getSectors: () => api.get('sectors'),
      getTickets: params => api.get('tickets', params),
      createTicket: params => api.post('tickets', params),
      updateTicket: (ticketId, params) =>
        api.put(`tickets/${ticketId}`, params),
      getBookings: (userId, params) =>
        api.get(`/users/${userId}/bookings`, params),
      createBooking: (userId, params) =>
        api.post(`/users/${userId}/bookings`, params),
      updateBooking: (userId, bookingId, params) =>
        api.put(`/users/${userId}/bookings/${bookingId}`, params),
      updatePassenger: (passengerId, params) =>
        api.put(`/passengers/${passengerId}`, params)
    }
  }
}
