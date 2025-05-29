// Auth routes
export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
}

// Admin routes
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  USERS: '/admin/users',
  SETTINGS: '/admin/settings',
  PROFILE: '/admin/profile'
}

// Main routes
export const MAIN_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  POST: '/blog/:id'
}

// Combine all routes
export const ROUTES = {
  ...AUTH_ROUTES,
  ...ADMIN_ROUTES,
  ...MAIN_ROUTES
}

// Route groups for navigation
export const ROUTE_GROUPS = {
  AUTH: Object.values(AUTH_ROUTES),
  ADMIN: Object.values(ADMIN_ROUTES),
  MAIN: Object.values(MAIN_ROUTES)
}

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
  ...Object.values(ADMIN_ROUTES)
]

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  ...Object.values(MAIN_ROUTES),
  ...Object.values(AUTH_ROUTES)
] 