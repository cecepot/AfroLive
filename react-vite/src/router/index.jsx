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
      {
        path: "events/:id/tickets",
        element: <ListedTickets />,
      },
      {
        path: "users/:id/listings/:listingId/tickets",
        element: <ManageTickets />,
      },
      {
        path: "users/:id/listings/:listingId/tickets/new",
        element: <CreateTickets />,
      },
      {
        path: "users/:id/cards",
        element: <PaymentOptions />,
      },
      {
        path: "users/:id/cards/add",
        element: <AddCardForm />,
      },
      {
        path: "users/:id/cards/:cardId/edit",
        element: <EditCardForm />,
      },
      // {
      //   path: "users/:id",
      //   element: <SignupFormPage />,
      // },
    ],
  },
]);
