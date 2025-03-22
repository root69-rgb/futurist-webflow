
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all pages
router.get('/', async (req, res) => {
  try {
    // IMPORTANT: This is a dummy implementation - Uncomment for real backend
    // const pages = await prisma.page.findMany({
    //   orderBy: { updatedAt: 'desc' }
    // });
    
    // Dummy data for now
    const pages = [
      { id: '1', title: 'Home', slug: '/', status: 'published', lastModified: '2023-08-15' },
      { id: '2', title: 'About Us', slug: '/about', status: 'published', lastModified: '2023-07-22' },
      { id: '3', title: 'Services', slug: '/services', status: 'published', lastModified: '2023-08-01' },
      { id: '4', title: 'Portfolio', slug: '/portfolio', status: 'published', lastModified: '2023-08-10' },
      { id: '5', title: 'Blog', slug: '/blog', status: 'published', lastModified: '2023-08-12' },
      { id: '6', title: 'Contact', slug: '/contact', status: 'published', lastModified: '2023-08-05' },
      { id: '7', title: 'Privacy Policy', slug: '/privacy', status: 'published', lastModified: '2023-06-18' },
    ];
    
    res.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Implement other routes for CRUD operations

module.exports = router;
