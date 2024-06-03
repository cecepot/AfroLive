import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage/HomePage';
import Layout from './Layout';
import EventPage from '../components/EventsPage/EventPage';
import ProfilePage from '../components/UserProfilePage/ProfilePage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
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
        // {
      //   path: "events/new",
      //   element: <SignupFormPage />,
      // },
      // {
      //   path: "users/:id",
      //   element: <SignupFormPage />,
      // },
    ],
  },
]);
