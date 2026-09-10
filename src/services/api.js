const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('kwathu_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  auth: {
    signup: (userData) => request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

    signin: (credentials) => request('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

    getProfile: () => request('/api/auth/profile'),

    updateProfile: (data) => request('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  },

  users: {
    getAll: () => request('/api/users'),

    getById: (id) => request(`/api/users/${id}`),
  },
};

export default api;
