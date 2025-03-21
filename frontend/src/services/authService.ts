
/**
 * Authentication service for handling user authentication
 * Currently using dummy authentication - replace with actual API calls to your Express backend
 */
import { post, get } from './api';

export type LoginCredentials = {
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
};

/**
 * Login with password
 * @param credentials - The login credentials (password only for now)
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: POST /api/auth/login
  
  try {
    // Uncomment the following line when backend is ready:
    // return await post('/auth/login', credentials);
    
    // Dummy implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.password === "admin123") {
          resolve({
            success: true,
            message: "Login successful",
          });
        } else {
          reject({
            success: false,
            message: "Invalid password",
          });
        }
      }, 800);
    });
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 */
export const checkAuth = async (): Promise<boolean> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: GET /api/auth/status
  
  try {
    // Uncomment the following line when backend is ready:
    // const response = await get('/auth/status');
    // return response.authenticated;
    
    // Dummy implementation
    return Promise.resolve(localStorage.getItem("adminAuth") === "true");
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: POST /api/auth/logout
  
  try {
    // Uncomment the following line when backend is ready:
    // await post('/auth/logout');
    
    // Dummy implementation
    localStorage.removeItem("adminAuth");
    return Promise.resolve();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Biometric authentication
 */
export const authenticateBiometric = async (): Promise<AuthResponse> => {
  // DUMMY IMPLEMENTATION - Replace with actual WebAuthn implementation that connects to your Express backend
  // Example backend endpoints: 
  // GET /api/auth/biometric/challenge
  // POST /api/auth/biometric/verify
  
  try {
    // Uncomment when backend with WebAuthn is ready:
    // const challenge = await get('/auth/biometric/challenge');
    // Implement proper WebAuthn authentication flow here
    // const result = await post('/auth/biometric/verify', { ...webAuthnResponse });
    // return result;
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Biometric authentication successful",
        });
      }, 1500);
    });
  } catch (error) {
    console.error('Biometric auth error:', error);
    throw error;
  }
};
