
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



export const movieAPI = {
  toggleLike: async (tmdbMovie) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Please login to like movies');
    }

    console.log('=== DEBUG: LIKE MOVIE REQUEST ===');
    console.log('🎬 Movie object:', tmdbMovie);
    console.log('🔑 Token preview:', token?.substring(0, 20) + '...');
    
    const url = `${API_BASE_URL}/movies/${tmdbMovie.id}/like`;
    console.log('🌐 Request URL:', url);
    
    const requestBody = {
      title: tmdbMovie.title || 'Unknown Title',
      poster: tmdbMovie.poster || (tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : ''),
      overview: tmdbMovie.overview || 'No overview available'
    };
    console.log('📤 Request body:', requestBody);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      // Check content type
      const contentType = response.headers.get('content-type');
      console.log('🏷️ Content-Type:', contentType);

      // Get response text first to see what we actually got
      const responseText = await response.text();
      console.log('📄 Raw response text:', responseText.substring(0, 500));

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Parsed JSON successfully:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        console.error('📄 Full response text:', responseText);
        throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}, Response: ${responseText.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;

    } catch (error) {
      console.error('🚫 Like request failed:', error);
      throw error;
    }
  },

  toggleSave: async (tmdbMovie) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Please login to save movies');
    }

    console.log('=== DEBUG: SAVE MOVIE REQUEST ===');
    console.log('💾 Movie object:', tmdbMovie);
    console.log('🔑 Token preview:', token?.substring(0, 20) + '...');
    
    const url = `${API_BASE_URL}/movies/${tmdbMovie.id}/save`;
    console.log('🌐 Request URL:', url);
    
    const requestBody = {
      title: tmdbMovie.title || 'Unknown Title',
      poster: tmdbMovie.poster || (tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : ''),
      overview: tmdbMovie.overview || 'No overview available'
    };
    console.log('📤 Request body:', requestBody);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      // Check content type
      const contentType = response.headers.get('content-type');
      console.log('🏷️ Content-Type:', contentType);

      // Get response text first to see what we actually got
      const responseText = await response.text();
      console.log('📄 Raw response text:', responseText.substring(0, 500));

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Parsed JSON successfully:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        console.error('📄 Full response text:', responseText);
        throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}, Response: ${responseText.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;

    } catch (error) {
      console.error('🚫 Save request failed:', error);
      throw error;
    }
  }
};