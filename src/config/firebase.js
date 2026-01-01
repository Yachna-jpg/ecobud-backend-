const admin = require('firebase-admin');

try {
  // You must download this file from Firebase Console -> Project Settings -> Service Accounts
  const serviceAccount = require('./serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin Initialized");
  module.exports = admin;

} catch (error) {
  console.log("\n⚠️  WARNING: 'serviceAccountKey.json' not found.");
  console.log("⚠️  Switched to MOCK MODE. Using fake authentication for testing.");
  
  // Mock Admin Object to simulate Firebase behavior for testing
  const mockAdmin = {
    auth: () => ({
      verifyIdToken: async (token) => {
        // Accept a specific test token, reject others
        if (token === 'verify-test-token') {
           return {
             uid: 'mock-uid-12345',
             email: 'mockuser@example.com',
             name: 'Mock User',
             picture: 'https://via.placeholder.com/150'
           };
        }
        throw new Error('Invalid Firebase ID token (Mock)');
      }
    })
  };
  
  module.exports = mockAdmin;
}
