export const API_CONFIG = {
  BASE_URL: "https://033966f86415.ngrok-free.app/api",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      SIGNUP: "/auth/register",
      VERIFY: "/auth/verify-otp",
      LOGOUT: "/auth/logout",
      ME: "/auth/me", // Added ME endpoint for user data fetching
    },
    USER: {
      POPULAR_VENUES: "/user/popular-venue",
      POPULAR_SPORTS: "/user/popular-sports",
      GET_VENUES: "/user/get-venue",
      SEARCH_VENUES: "/user/get-venuesearch", // Added user-specific endpoints for dashboard data
    },
    VENUES: "/venues",
    BOOKINGS: "/bookings",
    USERS: "/users",
  },
}

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
