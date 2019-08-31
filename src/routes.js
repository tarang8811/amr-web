import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout

// Dash Screens
import DashboardPage from 'Containers/Dash/DashboardPage'
import EditProfile from 'Containers/Dash/Profile/EditProfile'
import AddTicket from 'Containers/Dash/Tickets/AddTicket'
import AllTickets from 'Containers/Dash/Tickets/AllTickets'
import UserBookedTickets from 'Containers/Dash/Tickets/UserBookedTickets'
import ConfirmedBookings from 'Containers/Dash/Bookings/ConfirmedBookings'
import CanceledBookings from 'Containers/Dash/Bookings/CanceledBooking'
import PnrList from 'Containers/Dash/Bookings/PnrList'
// Main Screens
import BookingSelect from 'Containers/Main/BookingSelect'
import ConfirmBooking from 'Containers/Main/ConfirmBooking'

import { flatten } from 'ramda'

const allRoutes = ['Tickets', 'My Bookings', 'Profile']

const individualRoutes = {
  Tickets: [
    {
      path: '/add-ticket',
      name: 'Add Ticket',
      icon: Dashboard,
      component: AddTicket,
      layout: '/dash'
    },
    {
      path: '/all-tickets',
      name: 'All Tickets',
      icon: Dashboard,
      component: AllTickets,
      layout: '/dash'
    },
    {
      path: '/user-booked-tickets',
      name: 'User Booked Tickets',
      icon: Dashboard,
      component: UserBookedTickets,
      layout: '/dash'
    }
  ],
  'My Bookings': [
    {
      path: '/confirmed-booking',
      name: 'Confirmed Bookings',
      icon: Dashboard,
      component: ConfirmedBookings,
      layout: '/dash'
    },
    {
      path: '/cancelled-bookings',
      name: 'Cancelled Bookings',
      icon: Dashboard,
      component: CanceledBookings,
      layout: '/dash'
    }
  ],
  Profile: [
    {
      path: '/edit-profile',
      name: 'Edit Profile',
      icon: Dashboard,
      component: EditProfile,
      layout: '/dash'
    },
    {
      path: '/account-statement',
      name: 'Account Statement',
      icon: Dashboard,
      component: EditProfile,
      layout: '/dash'
    },
    {
      path: '/change-password',
      name: 'Change Password',
      icon: Dashboard,
      component: DashboardPage,
      layout: '/dash'
    },
    {
      path: '/logout',
      name: 'Logout',
      icon: Dashboard,
      component: DashboardPage,
      layout: '/dash'
    }
  ],
  Main: [
    {
      path: 'confirm-booking',
      name: 'Confirm Booking',
      component: ConfirmBooking,
      layout: '/'
    },
    {
      path: '',
      name: 'Amr Travels',
      component: BookingSelect,
      layout: '/'
    }
  ],
  Misc: [
    {
      path: '/edit-ticket',
      name: 'Edit Ticket',
      component: AddTicket,
      layout: '/dash'
    },
    {
      path: '/pnr-list',
      name: 'PNR LIST',
      component: PnrList,
      layout: '/dash'
    }
  ]
}

const individualRoutesArray = flatten(Object.values(individualRoutes))

export default { allRoutes, individualRoutes, individualRoutesArray }
