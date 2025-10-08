import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Supabase client with service role
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function resendConfirmation(email: string) {
  try {
    console.log(`\n📨 Resending confirmation email to: ${email}`);
    
    // First, find the user by email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }
    
    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    console.log(`Found user: ${user.id} (${user.email})`);
    
    // Update the user's email confirmation status
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { email_confirm: true }
    );
    
    if (updateError) {
      throw updateError;
    }
    
    console.log('✅ User email confirmed successfully!');
    console.log('You can now sign in with your email and password.');
    
  } catch (error) {
    console.error('\n❌ Error confirming user email:');
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
      }
    } else {
      console.error('An unknown error occurred');
    }
  } finally {
    process.exit(0);
  }
}

// Get email from command line arguments or use default
const email = process.argv[2] || 'admin@exam.com';
resendConfirmation(email);
