import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import DashboardPage from 'Containers/Dash/DashboardPage'
import UserProfile from 'Containers/Dash/Profile/UserProfile'
import AddTicket from 'Containers/Dash/Tickets/AddTicket'
import AllTickets from 'Containers/Dash/Tickets/AllTickets'
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
      component: DashboardPage,
      layout: '/dash'
    }
  ],
  'My Bookings': [
    {
      path: '/confirmed-booking',
      name: 'Confirmed Bookings',
      icon: Dashboard,
      component: DashboardPage,
      layout: '/dash'
    },
    {
      path: '/cancelled-bookings',
      name: 'Cancelled Bookings',
      icon: Dashboard,
      component: Dashboard,
      layout: '/dash'
    }
  ],
  Profile: [
    {
      path: '/edit-profile',
      name: 'Edit Profile',
      icon: Dashboard,
      component: UserProfile,
      layout: '/dash'
    },
    {
      path: '/account-statement',
      name: 'Account Statement',
      icon: Dashboard,
      component: UserProfile,
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
  ]
}

const individualRoutesArray = flatten(Object.values(individualRoutes))

export default { allRoutes, individualRoutes, individualRoutesArray }
