
/**
 * Message service for handling contact messages in the admin area
 * Currently using dummy implementation - replace with actual API calls to your Express backend
 */
import { get, post, put, del } from './api';

export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  archived: boolean;
};

/**
 * Get all messages
 */
export const getMessages = async (): Promise<Message[]> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: GET /api/admin/messages
  
  try {
    // Uncomment the following line when backend is ready:
    // return await get('/admin/messages');
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate mock messages
        const messages = generateMockMessages();
        resolve(messages);
      }, 800);
    });
  } catch (error) {
    console.error('Get messages error:', error);
    throw error;
  }
};

/**
 * Mark a message as read
 * @param id - The message ID
 */
export const markMessageAsRead = async (id: number): Promise<{ success: boolean }> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: PUT /api/admin/messages/:id/read
  
  try {
    // Uncomment the following line when backend is ready:
    // return await put(`/admin/messages/${id}/read`);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Message ${id} marked as read`);
        resolve({ success: true });
      }, 300);
    });
  } catch (error) {
    console.error('Mark message as read error:', error);
    throw error;
  }
};

/**
 * Archive a message
 * @param id - The message ID
 */
export const archiveMessage = async (id: number): Promise<{ success: boolean }> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: PUT /api/admin/messages/:id/archive
  
  try {
    // Uncomment the following line when backend is ready:
    // return await put(`/admin/messages/${id}/archive`);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Message ${id} archived`);
        resolve({ success: true });
      }, 300);
    });
  } catch (error) {
    console.error('Archive message error:', error);
    throw error;
  }
};

/**
 * Restore a message from archive
 * @param id - The message ID
 */
export const restoreMessage = async (id: number): Promise<{ success: boolean }> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: PUT /api/admin/messages/:id/restore
  
  try {
    // Uncomment the following line when backend is ready:
    // return await put(`/admin/messages/${id}/restore`);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Message ${id} restored`);
        resolve({ success: true });
      }, 300);
    });
  } catch (error) {
    console.error('Restore message error:', error);
    throw error;
  }
};

/**
 * Delete a message
 * @param id - The message ID
 */
export const deleteMessage = async (id: number): Promise<{ success: boolean }> => {
  // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
  // Example backend endpoint: DELETE /api/admin/messages/:id
  
  try {
    // Uncomment the following line when backend is ready:
    // return await del(`/admin/messages/${id}`);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Message ${id} deleted`);
        resolve({ success: true });
      }, 300);
    });
  } catch (error) {
    console.error('Delete message error:', error);
    throw error;
  }
};

// Helper function to generate mock messages (for dummy implementation only)
const generateMockMessages = (): Message[] => {
  const topics = [
    "General Inquiry", 
    "Service Request", 
    "Price Quote", 
    "Technical Support", 
    "Feedback"
  ];
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    subject: `${topics[i % topics.length]} - Request ${i + 1}`,
    message: `This is a sample message for demonstration purposes. The customer is interested in your services and wants more information about pricing and availability. Message ID: ${i + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString(),
    read: i < 5, // First 5 messages are read
    archived: i > 8 // Last 3 messages are archived
  }));
};
