const express = require('express');
const moment = require('moment');
const router = express.Router();
const User = require('../models/user');
const Art = require('../models/art');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

// Get all employees
router.get('/employees', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' });
    res.json({data: employees});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve employee
router.put('/employees/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json({data: user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject employee
router.put('/employees/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { approved: false }, { new: true });
    res.json({data: user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create art
router.post('/arts', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, time_to_complete, createdAt } = req.body;
  try {
    const newArt = new Art({ title, description, time_to_complete, completed: false, createdAt });
    await newArt.save();
    res.status(201).json({data: newArt});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an art by ID
router.put('/arts/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const artId = req.params.id; // Get the art ID from request parameters
  const { title, description, time_to_complete, createdAt } = req.body;

  try {
    const updatedArt = await Art.findByIdAndUpdate(
      artId,
      { title, description, time_to_complete, createdAt },
      { new: true }
    );

    if (!updatedArt) {
      return res.status(404).json({ error: 'Art not found' });
    }

    res.json({ message: 'Art updated successfully', data: updatedArt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an art by ID
router.delete('/arts/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const artId = req.params.id; // Get the art ID from request parameters

  try {
    const deletedArt = await Art.findByIdAndDelete(artId);

    if (!deletedArt) {
      return res.status(404).json({ error: 'Art not found' });
    }

    res.json({ message: 'Art deleted successfully', data: deletedArt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all arts
router.get('/arts', authMiddleware, async (req, res) => {
  try {
    const searchText = req.query.searchText || ''; // Default to empty string if searchText is not provided
    let arts;
    if (searchText.trim() !== '') {
      // Perform search if searchText is provided
      arts = await Art.find({ title: { $regex: searchText, $options: 'i' } });
    } else {
      // Fetch all records if searchText is not provided
      arts = await Art.find();
    }
    res.json({ data: arts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all arts or filter by date range
router.get('/arts/filter', authMiddleware,adminMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // Validate startdate and endDate
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Both startDate and endDate parameters are required' });
    }

// Convert startDate and endDate to Date objects
const startDateObj = moment(startDate).startOf('day').toDate(); // Start of the day for startDate
const endDateObj = moment(endDate).endOf('day').toDate(); // End of the day for endDate

    // Query arts that were created between startDateObj and endDateObj
    const arts = await Art.find({
      createdAt: {
        $gte: startDateObj,
        $lte: endDateObj
      }
    })

    res.json({ data: arts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all employees or filter by date range and calculate completedCount
router.get('/user/filter', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' });
    res.json({data: employees});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

