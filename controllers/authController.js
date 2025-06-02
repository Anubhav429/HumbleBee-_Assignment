const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller to handle user registration
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  // Hash the plain text password before storing
  const hashed = await bcrypt.hash(password, 10);

  // Create and save the new user with hashed password
  const user = await User.create({ username, password: hashed, role });

  // Respond with success message
  res.status(201).json({ message: 'User registered' });
};

// Controller to handle user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });

  // Validate user exists and password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token with user's ID and role
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET // secret key from environment variable
  );

  // Send the token as response
  res.json(

    {
      message: 'User LoggedIn Successfully',
      token
    });
};
