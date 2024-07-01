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
import ListedTickets from '../components/TicketPage/TicketPage';
import ManageTickets from '../components/TicketPage/ManageTickets';
import CreateTickets from '../components/TicketPage/CreateTickets';
import PaymentOptions from '../components/PaymentOptions/PaymentOptions';
import AddCardForm from '../components/PaymentOptions/AddCardForm';
import EditCardForm from '../components/PaymentOptions/EditCardForm';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import LandingPage from '../components/LandingPage/LandingPage';
import AboutPage from '../components/HomePage/About';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/landing",
        element: <LandingPage/>,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <EventPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/listings",
        element: (
          <ProtectedRoute>
            <Listings />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/listings/new",
        element: (
          <ProtectedRoute>
            <NewListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/listings/:listingId",
        element: (
          <ProtectedRoute>
            <EditListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "events/:id/tickets",
        element: (
          <ProtectedRoute>
            <ListedTickets />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/listings/:listingId/tickets",
        element: (
          <ProtectedRoute>
            <ManageTickets />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/listings/:listingId/tickets/new",
        element: (
          <ProtectedRoute>
            <CreateTickets />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/cards",
        element: (
          <ProtectedRoute>
            <PaymentOptions />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/cards/add",
        element: (
          <ProtectedRoute>
            <AddCardForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id/cards/:cardId/edit",
        element: (
          <ProtectedRoute>
            <EditCardForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "users/:id",
      //   element: <SignupFormPage />,
      // },
    ],
  },
]);
