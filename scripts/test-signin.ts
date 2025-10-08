import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as readline from 'readline';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test user credentials
const TEST_EMAIL = 'admin@4clab.com';
const TEST_PASSWORD = '4clab123'; // Updated password to meet 6-char minimum

console.log(`🔑 Testing sign-in as ${TEST_EMAIL}...`);

async function testSignIn() {
  console.log('🚀 Starting sign-in test...');
  
  try {
    // Start a simple HTTP server to handle the OAuth redirect
    const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      
      if (url.pathname === '/auth/callback') {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error getting session after sign-in:', error.message);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error getting session after sign-in');
          return;
        }
        
        console.log('✅ Sign-in successful!');
        console.log('Session data:', data);
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <body>
              <h1>Sign-in successful!</h1>
              <p>You can now close this window.</p>
              <script>window.close();</script>
            </body>
          </html>
        `);
        
        // Close the server after handling the callback
        server.close(() => {
          console.log('Test server closed');
          process.exit(0);
        });
        return;
      }
      
      res.writeHead(404);
      res.end('Not found');
    });
    
    // Start the server on a random port
    server.listen(0, '127.0.0.1', async () => {
      const address = server.address();
      if (address && typeof address !== 'string') {
        const redirectTo = `http://${address.address}:${address.port}/auth/callback`;
        
        console.log(`\n🔑 Attempting to sign in as ${TEST_EMAIL}...`);
        
        // Sign in with email and password
        const { data, error } = await supabase.auth.signInWithPassword({
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
        });
        
        if (error) {
          throw new Error(`❌ Sign-in failed: ${error.message}`);
        }
        
        if (!data.user) {
          throw new Error('❌ No user data returned after sign-in');
        }
        
        console.log('✅ Sign-in successful!');
        console.log('User:', data.user.email);
        console.log('Session:', data.session);
        
        // Verify the session
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw new Error(`❌ Error getting user: ${userError.message}`);
        }
        
        if (!userData.user) {
          throw new Error('❌ No user data returned from session');
        }
        
        const user = userData.user;
        
        console.log('\n🔍 User details:');
        console.log('- ID:', user.id);
        console.log('- Email:', user.email);
        console.log('- Confirmed:', user.email_confirmed_at ? '✅' : '❌');
        
        // Get the user's role from your users table
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          console.warn('⚠️ Could not fetch user role:', profileError.message);
        } else {
          const role = userProfile?.role || 'user';
          console.log('- Role:', role);
          
          // Test redirection based on role
          const redirectPath = role === 'admin' ? '/admin' : '/dashboard';
          console.log(`\n🔄 Should redirect to: ${redirectPath}`);
          
          // In a real test, you would navigate to this path and verify the content
          console.log(`\n✅ Test completed successfully!`);
          console.log(`The user should be redirected to: ${redirectPath}`);
        }
        
        // Sign out after the test
        await supabase.auth.signOut();
        console.log('\n🔒 Signed out successfully');
        
        process.exit(0);
      }
    });
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
      }
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

// Run the test
testSignIn();
