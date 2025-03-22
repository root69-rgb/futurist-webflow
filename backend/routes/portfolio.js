
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

// Get all portfolio projects
router.get('/', async (req, res) => {
  try {
    const { status, featured, limit, page = 1 } = req.query;
    
    // Build query filters
    const whereClause = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    if (featured) {
      whereClause.featured = featured === 'true';
    }
    
    // Handle pagination
    const take = limit ? parseInt(limit) : undefined;
    const skip = (page - 1) * (limit ? parseInt(limit) : 0);
    
    // Execute query
    const [projects, totalCount] = await Promise.all([
      prisma.portfolioProject.findMany({
        where: whereClause,
        orderBy: {
          completionDate: 'desc'
        },
        skip,
        take
      }),
      prisma.portfolioProject.count({ where: whereClause })
    ]);
    
    res.json({
      projects,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        pageSize: take || totalCount,
        totalPages: take ? Math.ceil(totalCount / take) : 1
      }
    });
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get portfolio project by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is UUID or slug
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const project = await prisma.portfolioProject.findFirst({
      where: isUuid ? { id: identifier } : { slug: identifier }
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Portfolio project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new portfolio project
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      content,
      client,
      featured, 
      status, 
      completionDate,
      featuredImage,
      galleryImages,
      technologies,
      metaTitle,
      metaDescription
    } = req.body;
    
    // Generate slug
    let slug = slugify(title, { lower: true, strict: true });
    
    // Check if slug exists
    const existingSlug = await prisma.portfolioProject.findUnique({
      where: { slug }
    });
    
    // If slug exists, append random string
    if (existingSlug) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }
    
    // Create project
    const project = await prisma.portfolioProject.create({
      data: {
        title,
        slug,
        description,
        content,
        client,
        featured: featured || false,
        status: status || 'draft',
        completionDate: completionDate ? new Date(completionDate) : null,
        featuredImage,
        galleryImages: galleryImages || [],
        technologies: technologies || [],
        metaTitle,
        metaDescription
      }
    });
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update portfolio project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      content,
      client,
      featured, 
      status, 
      completionDate,
      featuredImage,
      galleryImages,
      technologies,
      metaTitle,
      metaDescription
    } = req.body;
    
    // Check if project exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return res.status(404).json({ message: 'Portfolio project not found' });
    }
    
    // Generate new slug if title changed
    let slug = existingProject.slug;
    if (title && title !== existingProject.title) {
      slug = slugify(title, { lower: true, strict: true });
      
      // Check if new slug exists (but not for this project)
      const existingSlug = await prisma.portfolioProject.findFirst({
        where: {
          slug,
          id: { not: id }
        }
      });
      
      // If slug exists, append random string
      if (existingSlug) {
        slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
      }
    }
    
    // Prepare update data
    const updateData = {
      title,
      slug,
      description,
      content,
      client,
      featured,
      status,
      completionDate: completionDate ? new Date(completionDate) : null,
      featuredImage,
      galleryImages,
      technologies,
      metaTitle,
      metaDescription,
      updatedAt: new Date()
    };
    
    // Filter out undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    // Update project
    const project = await prisma.portfolioProject.update({
      where: { id },
      data: updateData
    });
    
    res.json(project);
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete portfolio project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return res.status(404).json({ message: 'Portfolio project not found' });
    }
    
    // Delete project
    await prisma.portfolioProject.delete({
      where: { id }
    });
    
    res.json({ message: 'Portfolio project deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
