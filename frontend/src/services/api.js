// // src/services/api.js

// const API_BASE_URL = 'http://localhost:5000/api';

// // Helper function for making API calls
// const apiCall = async (endpoint, options = {}) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//       ...options,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Something went wrong');
//     }

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Auth API calls
// export const authAPI = {
//   // Register user
//   register: async (userData) => {
//     return apiCall('/users/register', {
//       method: 'POST',
//       body: JSON.stringify(userData),
//     });
//   },

//   // Login user
//   login: async (credentials) => {
//     return apiCall('/users/login', {
//       method: 'POST',
//       body: JSON.stringify(credentials),
//     });
//   },

//   // Logout user
//   logout: async () => {
//     const token = localStorage.getItem('accessToken');
//     return apiCall('/users/logout', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },
// };

// // Helper functions for token management
// export const tokenUtils = {
//   setTokens: (accessToken, refreshToken) => {
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//   },

//   getAccessToken: () => {
//     return localStorage.getItem('accessToken');
//   },

//   clearTokens: () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//   },
// };


// // Just add this one function to your existing api.js for profile.jsx
// // export const userAPI = {
// //   getProfile: async () => {
// //     const token = localStorage.getItem('accessToken');
// //     return apiCall('/users/profile', {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
// //   }
// // };
// // Add this to your userAPI object in api.js
// export const userAPI = {
//   getProfile: async () => {
//     const token = localStorage.getItem('accessToken');
//     return apiCall('/users/profile', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   },
  
//   getLikedMovies: async () => {
//     const token = localStorage.getItem('accessToken');
//     return apiCall('/movies/user/liked', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   },

//   // Add these two new functions
//   getSavedMovies: async () => {
//     const token = localStorage.getItem('accessToken');
//     return apiCall('/movies/user/saved', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   },

//   getUserReviews: async () => {
//     const token = localStorage.getItem('accessToken');
//     return apiCall('/movies/user/reviews', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   },

//   // Add this new function
//   deleteAccount: async () => {
//     const token = localStorage.getItem('accessToken');
//     return apiCall('/users/delete-account', {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   }
  

// };


// src/services/api.js

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for making API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log(`🌐 Making API call to: ${API_BASE_URL}${endpoint}`);
    console.log('📋 Request options:', options);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log(`📡 Response status: ${response.status}`);

    const data = await response.json();
    console.log('📦 Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('🚫 API call failed:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  logout: async () => {
    const token = localStorage.getItem('accessToken');
    return apiCall('/users/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};



// User API calls
export const userAPI = {
  getProfile: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }
    return apiCall('/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  
  getLikedMovies: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }
    return apiCall('/movies/user/liked', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getSavedMovies: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }
    return apiCall('/movies/user/saved', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getUserReviews: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }
    return apiCall('/movies/user/reviews', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Fixed delete account function
  deleteAccount: async () => {
    const token = localStorage.getItem('accessToken');
    console.log('🔑 Token for delete:', token ? 'Present' : 'Missing');
    
    if (!token) {
      throw new Error('No access token found. Please login again.');
    }
    
    // return apiCall('/users/delete-account', {
    //   method: 'POST',
    //   headers: { 
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    return apiCall('/users/delete-account', {
      method: 'POST', // Changed from DELETE
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  
};

// Helper functions for token management
export const tokenUtils = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log('✅ Tokens saved to localStorage');
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('🧹 Tokens cleared from localStorage');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('accessToken');
  }
};