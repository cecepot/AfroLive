import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage/HomePage';
import Layout from './Layout';
import EventPage from '../components/EventsPage/EventPage';
import ProfilePage from '../components/UserProfilePage/ProfilePage';
import Listings from '../components/EventsPage/Listings';
import NewListing from '../components/EventsPage/newListingForm';
import EditListing from '../components/EventsPage/EditListingForm';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "events/:id",
        element: <EventPage />,
      },
      {
        path: "users/:id",
        element: <ProfilePage />,
      },
      {
        path: "users/:id/listings",
        element: <Listings />,
      },
      {
        path: "users/:id/listings/new",
        element: <NewListing />,
      },
      {
        path: "users/:id/listings/:listingId",
        element: <EditListing />,
      },
      // {
      //   path: "users/:id",
      //   element: <SignupFormPage />,
      // },
    ],
  },
]);
