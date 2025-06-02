const jwt = require('jsonwebtoken');

// Middleware to authenticate user via JWT token
exports.authenticate = (req, res, next) => {
  // Extract token from Authorization header: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, deny access
  if (!token) return res.status(401).json({ message: 'Token missing' });

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    // Attach decoded user info (like id, role) to request object
    req.user = decoded;
    next(); // Continue to the next middleware or route handler
  });
};

// Middleware to authorize access based on user roles
exports.authorize = (roles) => (req, res, next) => {
  // Check if user's role is included in the allowed roles
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' }); // Deny access if not authorized
  }

  next(); // Allow access if authorized
};
