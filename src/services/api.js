const API_URL = (process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? 'https://my-api-rzqy.onrender.com' : 'http://localhost:3000')).replace(/\/$/, '');

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

  listings: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/api/listings${query ? `?${query}` : ''}`);
    },

    getById: (id) => request(`/api/listings/${id}`),

    create: (data) => request('/api/listings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    update: (id, data) => request(`/api/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

    delete: (id) => request(`/api/listings/${id}`, {
      method: 'DELETE',
    }),

    getMyListings: () => request('/api/listings/my-listings'),
  },

  news: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/api/news${query ? `?${query}` : ''}`);
    },

    getById: (id) => request(`/api/news/${id}`),

    create: (data) => request('/api/news', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    update: (id, data) => request(`/api/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

    delete: (id) => request(`/api/news/${id}`, {
      method: 'DELETE',
    }),

    like: (id) => request(`/api/news/${id}/like`, {
      method: 'POST',
    }),

    share: (id) => request(`/api/news/${id}/share`, {
      method: 'POST',
    }),
  },

  events: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/api/events${query ? `?${query}` : ''}`);
    },

    getById: (id) => request(`/api/events/${id}`),

    create: (data) => request('/api/events', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    update: (id, data) => request(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

    delete: (id) => request(`/api/events/${id}`, {
      method: 'DELETE',
    }),

    attend: (id) => request(`/api/events/${id}/attend`, {
      method: 'POST',
    }),

    share: (id) => request(`/api/events/${id}/share`, {
      method: 'POST',
    }),
  },

  leagues: {
    getAll: () => request('/api/leagues'),

    getByKey: (key) => request(`/api/leagues/${key}`),

    create: (data) => request('/api/leagues', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    update: (key, data) => request(`/api/leagues/${key}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

    delete: (key) => request(`/api/leagues/${key}`, {
      method: 'DELETE',
    }),

    addFixture: (key, data) => request(`/api/leagues/${key}/fixtures`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    updateFixture: (key, fixtureId, data) => request(`/api/leagues/${key}/fixtures/${fixtureId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

    addResult: (key, data) => request(`/api/leagues/${key}/results`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    addStanding: (key, data) => request(`/api/leagues/${key}/standings`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    addNews: (key, data) => request(`/api/leagues/${key}/news`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },

  comments: {
    getAll: (commentableType, commentableId, params = {}) => {
      const query = new URLSearchParams({ commentableType, commentableId, ...params }).toString();
      return request(`/api/comments?${query}`);
    },

    getById: (id) => request(`/api/comments/${id}`),

    getCount: (commentableType, commentableId) => {
      const query = new URLSearchParams({ commentableType, commentableId }).toString();
      return request(`/api/comments/count?${query}`);
    },

    create: (data) => request('/api/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    update: (id, data) => request(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

    delete: (id) => request(`/api/comments/${id}`, {
      method: 'DELETE',
    }),

    like: (id) => request(`/api/comments/${id}/like`, {
      method: 'POST',
    }),
  },

  messages: {
    getConversations: () => request('/api/messages/conversations'),

    getUnreadCount: () => request('/api/messages/unread-count'),

    getMessages: (otherUserId, params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/api/messages/${otherUserId}${query ? `?${query}` : ''}`);
    },

    send: (data) => request('/api/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    markRead: (messageId) => request(`/api/messages/${messageId}/read`, {
      method: 'PUT',
    }),

    delete: (messageId) => request(`/api/messages/${messageId}`, {
      method: 'DELETE',
    }),
  },
};

export default api;
