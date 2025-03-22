
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

// Get all blog posts with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, featured, category, tag, limit, page = 1 } = req.query;
    
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
    
    // Include related data conditionally
    let includeClause = {
      categories: true,
      tags: true
    };
    
    // If category filter is applied
    if (category) {
      whereClause.categories = {
        some: {
          slug: category
        }
      };
    }
    
    // If tag filter is applied
    if (tag) {
      whereClause.tags = {
        some: {
          slug: tag
        }
      };
    }
    
    // Execute query
    const [posts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where: whereClause,
        include: includeClause,
        orderBy: {
          publishedAt: 'desc'
        },
        skip,
        take
      }),
      prisma.blogPost.count({ where: whereClause })
    ]);
    
    res.json({
      posts,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        pageSize: take || totalCount,
        totalPages: take ? Math.ceil(totalCount / take) : 1
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get blog post by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is UUID or slug
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const post = await prisma.blogPost.findFirst({
      where: isUuid ? { id: identifier } : { slug: identifier },
      include: {
        categories: true,
        tags: true
      }
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new blog post
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      content, 
      excerpt, 
      featured, 
      status, 
      featuredImage,
      metaTitle,
      metaDescription,
      categoryIds,
      tagIds,
      publishedAt
    } = req.body;
    
    // Generate slug
    let slug = slugify(title, { lower: true, strict: true });
    
    // Check if slug exists
    const existingSlug = await prisma.blogPost.findUnique({
      where: { slug }
    });
    
    // If slug exists, append random string
    if (existingSlug) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }
    
    // Create post with connected relations
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featured: featured || false,
        status: status || 'draft',
        publishedAt: publishedAt ? new Date(publishedAt) : status === 'published' ? new Date() : null,
        featuredImage,
        metaTitle,
        metaDescription,
        createdBy: req.user?.id,
        categories: categoryIds ? {
          connect: categoryIds.map(id => ({ id }))
        } : undefined,
        tags: tagIds ? {
          connect: tagIds.map(id => ({ id }))
        } : undefined
      },
      include: {
        categories: true,
        tags: true
      }
    });
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog post
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      content, 
      excerpt, 
      featured, 
      status, 
      featuredImage,
      metaTitle,
      metaDescription,
      categoryIds,
      tagIds,
      publishedAt
    } = req.body;
    
    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Generate new slug if title changed
    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      slug = slugify(title, { lower: true, strict: true });
      
      // Check if new slug exists (but not for this post)
      const existingSlug = await prisma.blogPost.findFirst({
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
      content,
      excerpt,
      featured,
      status,
      publishedAt: publishedAt ? new Date(publishedAt) : 
                  status === 'published' && !existingPost.publishedAt ? new Date() : 
                  existingPost.publishedAt,
      featuredImage,
      metaTitle,
      metaDescription,
      updatedBy: req.user?.id,
      updatedAt: new Date()
    };
    
    // Filter out undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    // Update post including relationship changes
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateData,
        // Handle category updates if provided
        ...(categoryIds && {
          categories: {
            set: [], // Clear existing connections
            connect: categoryIds.map(categoryId => ({ id: categoryId }))
          }
        }),
        // Handle tag updates if provided
        ...(tagIds && {
          tags: {
            set: [], // Clear existing connections
            connect: tagIds.map(tagId => ({ id: tagId }))
          }
        })
      },
      include: {
        categories: true,
        tags: true
      }
    });
    
    res.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Delete post
    await prisma.blogPost.delete({
      where: { id }
    });
    
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create category
router.post('/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Generate slug
    let slug = slugify(name, { lower: true, strict: true });
    
    // Check if slug exists
    const existingSlug = await prisma.category.findUnique({
      where: { slug }
    });
    
    // If slug exists, append random string
    if (existingSlug) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }
    
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description
      }
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create tag
router.post('/tags', async (req, res) => {
  try {
    const { name } = req.body;
    
    // Generate slug
    let slug = slugify(name, { lower: true, strict: true });
    
    // Check if slug exists
    const existingSlug = await prisma.tag.findUnique({
      where: { slug }
    });
    
    // If slug exists, append random string
    if (existingSlug) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }
    
    const tag = await prisma.tag.create({
      data: {
        name,
        slug
      }
    });
    
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
