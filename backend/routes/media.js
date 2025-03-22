
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const uploadPath = process.env.UPLOAD_PATH || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: (req, file, cb) => {
    // Accept images, videos, documents
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|mp4|webm|pdf|doc|docx|xls|xlsx|ppt|pptx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('File type not supported'));
    }
  }
});

// Get all media items
router.get('/', async (req, res) => {
  try {
    const { folderId } = req.query;
    
    const whereClause = {};
    if (folderId) {
      whereClause.folderId = folderId;
    }
    
    const media = await prisma.media.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get media by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const media = await prisma.media.findUnique({
      where: { id }
    });
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    res.json(media);
  } catch (error) {
    console.error('Error fetching media item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload new media
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const { name, alt, caption, folderId } = req.body;
    
    // Get file dimensions for images
    let dimensions = null;
    if (req.file.mimetype.startsWith('image/')) {
      // In a real implementation, use a package like 'image-size' to get dimensions
      dimensions = '1920x1080'; // Placeholder
    }
    
    // Create media record
    const media = await prisma.media.create({
      data: {
        name: name || req.file.originalname,
        fileName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        url: `/${req.file.path}`,
        dimensions,
        alt: alt || '',
        caption: caption || '',
        folderId: folderId || null,
        createdBy: req.user?.id || null
      }
    });
    
    res.status(201).json(media);
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update media
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, alt, caption, folderId } = req.body;
    
    const media = await prisma.media.update({
      where: { id },
      data: {
        name,
        alt,
        caption,
        folderId,
        updatedAt: new Date()
      }
    });
    
    res.json(media);
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete media
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get media info first
    const media = await prisma.media.findUnique({
      where: { id }
    });
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Delete from database
    await prisma.media.delete({
      where: { id }
    });
    
    // Delete file from filesystem
    if (fs.existsSync(media.path)) {
      fs.unlinkSync(media.path);
    }
    
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all folders
router.get('/folders', async (req, res) => {
  try {
    const folders = await prisma.mediaFolder.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create folder
router.post('/folders', async (req, res) => {
  try {
    const { name, parentId } = req.body;
    
    const folder = await prisma.mediaFolder.create({
      data: {
        name,
        parentId
      }
    });
    
    res.status(201).json(folder);
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
