export const API_CONFIG = {
  BASE_URL: "https://cd7048245f0a.ngrok-free.app/api",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      SIGNUP: "/auth/register",
      VERIFY: "/auth/verify-otp",
      LOGOUT: "/auth/logout",
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
