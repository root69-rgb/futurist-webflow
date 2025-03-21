
/**
 * Base API service for making HTTP requests to the backend
 * Replace the dummy implementations with actual API calls when connecting to your Express backend
 */

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api' 
  : 'http://localhost:5000/api';

/**
 * Generic function to handle API response and errors
 */
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred with the API request');
  }
  
  return response.json();
};

/**
 * Base function for making API requests
 */
export const apiRequest = async (
  endpoint: string, 
  method: string = 'GET', 
  data: any = null, 
  headers: HeadersInit = {}
) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include', // For handling cookies/sessions
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Convenience methods
export const get = (endpoint: string, headers = {}) => apiRequest(endpoint, 'GET', null, headers);
export const post = (endpoint: string, data = {}, headers = {}) => apiRequest(endpoint, 'POST', data, headers);
export const put = (endpoint: string, data = {}, headers = {}) => apiRequest(endpoint, 'PUT', data, headers);
export const del = (endpoint: string, headers = {}) => apiRequest(endpoint, 'DELETE', null, headers);
