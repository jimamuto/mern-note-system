// frontend/src/config.js

// Base URL for backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';


// All API endpoints
export const API_URLS = {
  notes: `${API_BASE_URL}/api/notes`,
  noteById: (id) => `${API_BASE_URL}/api/notes/${id}`,
};
