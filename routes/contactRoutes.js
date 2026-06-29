const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("CONTACT HIT ✅");
    console.log(req.body);

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ SAVE TO DATABASE
    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();

    console.log("MESSAGE SAVED ✅");

    res.json({
      message: "Message sent successfully ✅",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error saving message",
    });
  }
});

module.exports = router;