import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ErrorBoundary } from '@components/errors'
import { SpinnerLoading } from '@components/loadings'
import ProtectedRoute from '@components/auth/ProtectedRoute'
import store from './store'

// Lazy load components
const lazyLoad = (children) => (
  <Suspense fallback={<SpinnerLoading />}>
    {children}
  </Suspense>
)

// Layouts
const MainLayout = lazy(() => import('@components/layouts/main'))
const AdminLayout = lazy(() => import('@components/layouts/admin'))

// Pages
const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Login = lazy(() => import('@pages/auth/Login'))
const Register = lazy(() => import('@pages/auth/Register'))
const Dashboard = lazy(() => import('@pages/admin/Dashboard'))
const Users = lazy(() => import('@pages/admin/Users'))
const Settings = lazy(() => import('@pages/admin/Settings'))

const router = createBrowserRouter([
  {
    path: '/',
    element: lazyLoad(<MainLayout />),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: lazyLoad(<Home />)
      },
      {
        path: 'about',
        element: lazyLoad(<About />)
      },
      {
        path: 'login',
        element: lazyLoad(<Login />)
      },
      {
        path: 'register',
        element: lazyLoad(<Register />)
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        {lazyLoad(<AdminLayout />)}
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: lazyLoad(<Dashboard />)
      },
      {
        path: 'users',
        element: lazyLoad(<Users />)
      },
      {
        path: 'settings',
        element: lazyLoad(<Settings />)
      }
    ]
  }
])

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
