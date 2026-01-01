const admin = require('../config/firebase');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // 1. Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid } = decodedToken;

    // 2. Find or Create User in MongoDB
    // We link by email. 
    let user = await User.findOne({ email });

    if (!user) {
        // Optional: Auto-create user if they don't exist in our DB yet
        // For now, we will assume they might need to register via our API first 
        // OR we can just create them on the fly (Sync). 
        // Let's create on the fly for better UX.
        user = await User.create({
            name: decodedToken.name || 'Firebase User',
            email: email,
            password: 'firebase-linked-account', // Dummy password
            role: 'citizen'
        });
    }

    req.user = user;
    req.firebaseUid = uid;
    next();

  } catch (error) {
    console.error('Firebase Auth Error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin: adminMiddleware };
