import ProtectedRoute from '@components/auth/ProtectedRoute';
import { ErrorBoundary } from '@components/errors';
import { SpinnerLoading } from '@components/loadings';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';

// Layouts
const MainLayout = lazy(() => import('@components/layouts/main'));
const AdminLayout = lazy(() => import('@components/layouts/admin'));

// Pages
const Home = lazy(() => import('@pages/Home'));
const About = lazy(() => import('@pages/About'));
const Login = lazy(() => import('@pages/auth/Login'));
const Register = lazy(() => import('@pages/auth/Register'));
const Dashboard = lazy(() => import('@pages/admin/Dashboard'));
const Users = lazy(() => import('@pages/admin/Users'));
const Settings = lazy(() => import('@pages/admin/Settings'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<SpinnerLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
};

export default App;
