import Dashboard from '@material-ui/icons/Dashboard';
// core components/views for Admin layout
import DashboardPage from 'Containers/Dash/DashboardPage';
import UserProfile from 'Containers/Dash/UserProfile';

const dashboardRoutes = [
  {
    path: '/my-booking',
    name: 'My Bookings',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/dash'
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: Dashboard,
    component: UserProfile,
    layout: '/dash'
  },
  {
    path: '/tickets',
    name: 'My Tickets',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/dash'
  }
];

export default dashboardRoutes;
