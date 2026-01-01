const http = require('http');

// Helper to make requests
const request = (path, method, data, token) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
             resolve({ status: res.statusCode, body: body });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

const runVerification = async () => {
  console.log('--- Starting Backend Verification (Firebase Mode) ---');

  // 1. Check Root
  try {
      const root = await request('/', 'GET');
      console.log(`[GET /] Status: ${root.status} - ${root.body}`);
  } catch (err) {
      console.error("Failed to connect to server. Is it running?");
      process.exit(1);
  }

  // 2. Login (Using Mock Token)
  // Since we replaced Register with Google Login, we simluate sending a Firebase Token
  console.log(`\nLogging in with Firebase Token...`);
  const login = await request('/api/auth/google-login', 'POST', {}, 'verify-test-token');
  console.log(`[POST /api/auth/google-login] Status: ${login.status}`);
  
  if (login.status !== 200) {
      console.error('Login failed:', login.body);
      console.log('NOTE: Ensure the server is running and using the MOCK configuration if no real keys are present.');
      return;
  }

  // We use the SAME token for subsequent requests because in Firebase the ID token is the access token
  const token = 'verify-test-token'; 
  console.log(`User: ${login.body.email} (ID: ${login.body._id})`);

  // 3. Get Profile
  const profile = await request('/api/auth/profile', 'GET', null, token);
  console.log(`[GET /api/auth/profile] Status: ${profile.status}, Points: ${profile.body.points}`);

  // 4. Create Report
  const reportPayload = {
      image: "http://example.com/waste.jpg",
      latitude: 12.9716,
      longitude: 77.5946,
      description: "Found waste here (Verification)"
  };
  const report = await request('/api/reports', 'POST', reportPayload, token);
  console.log(`[POST /api/reports] Status: ${report.status}, Report Status: ${report.body.status}`);

  // 5. Check Points Increase
  const profileAfter = await request('/api/auth/profile', 'GET', null, token);
  console.log(`[GET /api/auth/profile] Points after report: ${profileAfter.body.points} (Should increase)`);

  console.log('\n--- Verification Complete ---');
};

runVerification();
