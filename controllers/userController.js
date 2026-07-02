const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// =====================
// SIGNUP
// =====================
exports.signup = async (req, res) => {
  try {
    console.log("SIGNUP HIT ✅");
    console.log("BODY:", req.body);

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log("BEFORE SAVE");

    await user.save();

    console.log("AFTER SAVE ✅");

    res.json({ message: "User created successfully" });

  } catch (error) {
    console.log("ERROR:", error);

    // Duplicate email
    if (error.code === 11000) {
        return res.status(400).json({
            message: "Email already exists. Please log in or use another email."
        });
    }

    res.status(500).json({
        message: "Error creating user"
    });
}
};

// =====================
// LOGIN
// =====================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
       username: user.username,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login error"
    });
  }
};
