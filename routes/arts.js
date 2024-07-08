const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth');
const EmployeeArt = require('../models/employeeArt');
const User = require('../models/user');
const Art = require('../models/art');

//Save Completed Arts
router.post('/finish', authMiddleware, async (req, res) => {
  const {userId, artId, status, startTime, endTime, totalTime, canvasData} = req.body;

  try {
    const newCompletion = new EmployeeArt({
      userId, artId, status, startTime, endTime, totalTime, canvasData
    });
    await newCompletion.save();
    // Update completedArts length in User model
    await User.findByIdAndUpdate(userId, {
      $inc: {completedArts: 1} // Increment completedArtsCount by 1
    });
    const user = await User.findById(userId)
    user.completedArtsId.push(newCompletion)
    await user.save()

    const art = await Art.findById(artId)
    art.completedUserId.push(userId)
    await art.save()
    res.status(201).json({data: newCompletion});


  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
