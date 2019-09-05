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
import AddFlight from 'Containers/Dash/Admin/AddFlight'
import AllFlights from 'Containers/Dash/Admin/AllFlights'
import AllUsers from 'Containers/Dash/Admin/AllUsers'
import EditUser from 'Containers/Dash/Admin/EditUser'
import AccountStatement from 'Containers/Dash/Profile/AccountStatement'
import ChangePassword from 'Containers/Dash/Profile/ChangePassword'
import Logout from 'Containers/Dash/Profile/Logout'
import ViewTicket from 'Containers/Dash/Tickets/ViewTicket'

// Main Screens
import BookingSelect from 'Containers/Main/BookingSelect'
import ConfirmBooking from 'Containers/Main/ConfirmBooking'

import { flatten } from 'ramda'
import store from 'store'

const allRoutesFunc = () => {
  const userData = store.get('userData')

  if (userData && userData.role && userData.role.name) {
    switch (userData.role.name) {
      case 'Admin':
        return allRoutesForAdmin
      case 'Agent':
        return allRoutesForAgent
      case 'User':
        return allRoutesForUser
    }
  } else {
    return []
  }
}

const allRoutesForAdmin = ['Admin', 'Tickets', 'My Bookings', 'Profile']
const allRoutesForAgent = ['Tickets', 'My Bookings', 'Profile']
const allRoutesForUser = ['My Bookings', 'Profile']

const allRoutes = allRoutesFunc()

const individualRoutes = {
  Admin: [
    {
      path: '/add-flight',
      name: 'Add Flight',
      icon: Dashboard,
      component: AddFlight,
      layout: '/dash'
    },
    {
      path: '/all-flights',
      name: 'All Flights',
      icon: Dashboard,
      component: AllFlights,
      layout: '/dash'
    },
    {
      path: '/all-users',
      name: 'All Users',
      icon: Dashboard,
      component: AllUsers,
      layout: '/dash'
    }
  ],
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
      component: AccountStatement,
      layout: '/dash'
    },
    {
      path: '/change-password',
      name: 'Change Password',
      icon: Dashboard,
      component: ChangePassword,
      layout: '/dash'
    },
    {
      path: '/logout',
      name: 'Logout',
      icon: Dashboard,
      component: Logout,
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
    },
    {
      path: '/edit-flight',
      name: 'Edit Flight',
      icon: Dashboard,
      component: AddFlight,
      layout: '/dash'
    },
    {
      path: '/edit-user',
      name: 'Edit User',
      component: EditUser,
      layout: '/dash'
    },
    {
      path: '/view-ticket',
      name: 'View Ticket',
      component: ViewTicket,
      layout: '/dash'
    }
  ]
}

const individualRoutesArray = flatten(Object.values(individualRoutes))

export default { allRoutes, individualRoutes, individualRoutesArray }
