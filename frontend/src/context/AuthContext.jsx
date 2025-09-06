// import { createContext, useContext, useState, useEffect } from 'react';
// import { tokenUtils } from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check if user is logged in on app start
//   useEffect(() => {
//     const token = tokenUtils.getAccessToken();
//     if (token) {
//       setIsAuthenticated(true);
//       // You could also decode the token to get user info
//       // For now, we'll just set authenticated state
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData, tokens) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     tokenUtils.setTokens(tokens.accessToken, tokens.refreshToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     tokenUtils.clearTokens();
//   };

//   const value = {
//     isAuthenticated,
//     user,
//     login,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    return data;
  }
};