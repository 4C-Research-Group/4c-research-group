import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function updateToAdmin(userId: string) {
  try {
    console.log(`\n🔄 Updating user ${userId} to admin...`);
    
    // Update user role in the users table
    const { data, error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating user role: ${error.message}`);
    }
    
    console.log('✅ Successfully updated user to admin:');
    console.log(`- ID: ${data.id}`);
    console.log(`- Email: ${data.email}`);
    console.log(`- Role: ${data.role}`);
    
  } catch (error) {
    console.error('\n❌ Error updating user to admin:');
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

// Get user ID from command line arguments
const userId = process.argv[2];
if (!userId) {
  console.error('Please provide a user ID as an argument');
  console.log('Usage: npm run update-to-admin <user-id>');
  process.exit(1);
}

// Run the function
updateToAdmin(userId);
