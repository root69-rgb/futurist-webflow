
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get settings by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    // Get all settings for the specified category
    const settings = await prisma.siteSetting.findMany({
      where: {
        category
      }
    });
    
    // Convert array to object with key-value pairs
    const settingsObject = settings.reduce((obj, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    
    res.json(settingsObject);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update settings
router.put('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const settings = req.body; // Object with key-value pairs
    
    // Validate request
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ message: 'Invalid settings data' });
    }
    
    // Store results
    const results = [];
    
    // Process each setting
    for (const [key, value] of Object.entries(settings)) {
      // Check if setting exists
      const existingSetting = await prisma.siteSetting.findUnique({
        where: {
          category_key: {
            category,
            key
          }
        }
      });
      
      if (existingSetting) {
        // Update existing setting
        const updated = await prisma.siteSetting.update({
          where: {
            id: existingSetting.id
          },
          data: {
            value: String(value),
            updatedAt: new Date()
          }
        });
        results.push(updated);
      } else {
        // Create new setting
        const created = await prisma.siteSetting.create({
          data: {
            category,
            key,
            value: String(value)
          }
        });
        results.push(created);
      }
    }
    
    res.json({
      message: 'Settings updated successfully',
      updated: results.length
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    
    // Group by category
    const grouped = settings.reduce((result, setting) => {
      if (!result[setting.category]) {
        result[setting.category] = {};
      }
      result[setting.category][setting.key] = setting.value;
      return result;
    }, {});
    
    res.json(grouped);
  } catch (error) {
    console.error('Error fetching all settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a setting
router.delete('/:category/:key', async (req, res) => {
  try {
    const { category, key } = req.params;
    
    // Check if setting exists
    const existingSetting = await prisma.siteSetting.findUnique({
      where: {
        category_key: {
          category,
          key
        }
      }
    });
    
    if (!existingSetting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    
    // Delete setting
    await prisma.siteSetting.delete({
      where: {
        id: existingSetting.id
      }
    });
    
    res.json({ message: 'Setting deleted successfully' });
  } catch (error) {
    console.error('Error deleting setting:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
