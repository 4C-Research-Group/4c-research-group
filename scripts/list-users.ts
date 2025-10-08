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

async function listUsers() {
  try {
    console.log('\n📋 Listing all users...');
    
    // List auth users
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      throw new Error(`Error listing auth users: ${authError.message}`);
    }
    
    console.log('\n🔐 Auth Users:');
    users.forEach(user => {
      console.log(`- ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Last Sign In: ${user.last_sign_in_at}`);
      console.log(`  Confirmed: ${user.email_confirmed_at ? '✅' : '❌'}`);
      console.log('---');
    });
    
    // List users from your users table
    const { data: dbUsers, error: dbError } = await supabase
      .from('users')
      .select('*');
    
    if (dbError) {
      throw new Error(`Error listing database users: ${dbError.message}`);
    }
    
    console.log('\n💾 Database Users:');
    dbUsers?.forEach(user => {
      console.log(`- ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role || 'user'}`);
      console.log(`  Created: ${user.created_at}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('\n❌ Error listing users:');
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
  } finally {
    process.exit(0);
  }
}

// Run the function
listUsers();
