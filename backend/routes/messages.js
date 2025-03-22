
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all messages
router.get('/', async (req, res) => {
  try {
    // IMPORTANT: This is a dummy implementation - Uncomment for real backend
    // const messages = await prisma.contactMessage.findMany({
    //   orderBy: { createdAt: 'desc' }
    // });
    
    // Dummy data for now
    const messages = [
      { 
        id: '1', 
        name: 'John Smith', 
        email: 'john@example.com', 
        subject: 'Website Inquiry', 
        message: 'I would like to get a quote for a new e-commerce website.', 
        status: 'unread', 
        createdAt: '2023-08-15T10:30:00Z'
      },
      { 
        id: '2', 
        name: 'Sarah Johnson', 
        email: 'sarah@example.com', 
        subject: 'Design Consultation', 
        message: 'I need help redesigning my company logo and website.', 
        status: 'read', 
        createdAt: '2023-08-14T15:45:00Z' 
      },
      { 
        id: '3', 
        name: 'Michael Brown', 
        email: 'michael@example.com', 
        subject: 'Technical Support', 
        message: 'I am experiencing issues with my website contact form.', 
        status: 'responded', 
        createdAt: '2023-08-10T09:15:00Z',
        responseText: 'Thank you for reaching out. I've looked into the issue and fixed the contact form. Please try again and let me know if you still experience problems.',
        respondedAt: '2023-08-10T14:22:00Z'
      }
    ];
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific message
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // IMPORTANT: This is a dummy implementation - Uncomment for real backend
    // const message = await prisma.contactMessage.findUnique({
    //   where: { id }
    // });
    
    // Dummy data for now
    const message = { 
      id, 
      name: 'John Smith', 
      email: 'john@example.com', 
      phone: '(123) 456-7890',
      subject: 'Website Inquiry', 
      message: 'I would like to get a quote for a new e-commerce website. Our company sells handmade crafts and we need a modern, responsive design with payment processing capabilities. Please let me know what information you need to provide a quote.', 
      status: 'unread', 
      createdAt: '2023-08-15T10:30:00Z'
    };
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update message status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // IMPORTANT: This is a dummy implementation - Uncomment for real backend
    // const updatedMessage = await prisma.contactMessage.update({
    //   where: { id },
    //   data: { status }
    // });
    
    res.json({
      id,
      status,
      message: 'Message status updated successfully'
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Respond to a message
router.post('/:id/respond', async (req, res) => {
  try {
    const { id } = req.params;
    const { responseText } = req.body;
    
    // IMPORTANT: This is a dummy implementation - Uncomment for real backend
    // const updatedMessage = await prisma.contactMessage.update({
    //   where: { id },
    //   data: { 
    //     status: 'responded',
    //     responseText,
    //     respondedAt: new Date()
    //   }
    // });
    
    // Here you would also typically send an email with the response
    
    res.json({
      id,
      status: 'responded',
      responseText,
      respondedAt: new Date().toISOString(),
      message: 'Response sent successfully'
    });
  } catch (error) {
    console.error('Error responding to message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // IMPORTANT: This is a dummy implementation - Uncomment for real backend
    // await prisma.contactMessage.delete({
    //   where: { id }
    // });
    
    res.json({ 
      message: 'Message deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
