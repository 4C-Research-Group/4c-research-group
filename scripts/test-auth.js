const fetch = require('node-fetch');
require('dotenv').config();

const API_URL = 'http://localhost:3000/api/auth';

async function testAuth() {
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'Test@1234';

  // Test Sign Up
  console.log('Testing Sign Up...');
  try {
    const signUpResponse = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });

    const signUpData = await signUpResponse.json();
    console.log('Sign Up Response:', signUpResponse.status, signUpData);

    if (!signUpResponse.ok) {
      throw new Error(`Sign up failed: ${signUpData.error || 'Unknown error'}`);
    }

    console.log('✅ Sign Up Successful');

    // Test Sign In (using the same credentials)
    console.log('\nTesting Sign In...');
    const signInResponse = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });

    const signInData = signInResponse.headers.get('content-type')?.includes('application/json')
      ? await signInResponse.json()
      : await signInResponse.text();

    console.log('Sign In Response:', signInResponse.status, signInData);

    if (!signInResponse.ok) {
      throw new Error(`Sign in failed: ${signInData.error || 'Unknown error'}`);
    }

    console.log('✅ Sign In Successful');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    process.exit(1);
  }
}

testAuth();
