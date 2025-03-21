
/**
 * Contact service for handling contact form submissions and contact information
 * Currently using dummy implementation - replace with actual API calls to your Express backend
 */
import { post, get, put } from './api';

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  stayInformed: boolean;
};

export type ContactDetails = {
  address: string;
  coordinates: string;
  plusCode: string;
  phone: string;
  email: string;
  businessHours: string;
};

/**
 * Submit contact form
 * @param formData - The contact form data
 */
export const submitContactForm = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: POST /api/contact/submit
  
  try {
    // Uncomment the following line when backend is ready:
    // return await post('/contact/submit', formData);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Contact form submitted:', formData);
        resolve({
          success: true,
          message: "Your message has been sent successfully!",
        });
      }, 800);
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

/**
 * Get contact details for the company
 */
export const getContactDetails = async (): Promise<ContactDetails> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: GET /api/contact/details
  
  try {
    // Uncomment the following line when backend is ready:
    // return await get('/contact/details');
    
    // Dummy implementation
    return Promise.resolve({
      address: "Acharya Dr Sarvepalli Radhakrishnan Rd, Thammenahalli Village, Bengaluru, Karnataka 560090, India",
      coordinates: "13.079977006037252, 77.49676704497915",
      plusCode: "3FHW+XP Bengaluru, Karnataka, India",
      phone: "+91 6202229617",
      email: "info@viewtech.com",
      businessHours: "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed"
    });
  } catch (error) {
    console.error('Get contact details error:', error);
    throw error;
  }
};

/**
 * Update contact details
 * @param details - The updated contact details
 */
export const updateContactDetails = async (details: ContactDetails): Promise<{ success: boolean; message: string }> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: PUT /api/contact/details
  
  try {
    // Uncomment the following line when backend is ready:
    // return await put('/contact/details', details);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Contact details updated:', details);
        resolve({
          success: true,
          message: "Contact details updated successfully!",
        });
      }, 800);
    });
  } catch (error) {
    console.error('Update contact details error:', error);
    throw error;
  }
};

/**
 * Send a live chat message
 * @param message - The chat message
 */
export const sendChatMessage = async (message: string): Promise<{ success: boolean; message: string }> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: POST /api/contact/chat
  
  try {
    // Uncomment the following line when backend is ready:
    // return await post('/contact/chat', { message });
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Chat message sent:', message);
        resolve({
          success: true,
          message: "Message sent to support agent",
        });
      }, 500);
    });
  } catch (error) {
    console.error('Send chat message error:', error);
    throw error;
  }
};
