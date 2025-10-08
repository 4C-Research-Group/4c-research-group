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

async function checkUser(email: string) {
  try {
    console.log(`\n🔍 Checking user: ${email}`);
    
    // Check auth users using admin API
    const { data: { users }, error: listUsersError } = await supabase.auth.admin.listUsers();
    
    if (listUsersError) {
      console.error('Error listing users:', listUsersError.message);
      return;
    }
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log('❌ User not found in auth users');
      return;
    }
    
    console.log('\n🔐 Auth User Details:');
    console.log('- ID:', user.id);
    console.log('- Email:', user.email);
    console.log('- Email Confirmed:', user.email_confirmed_at ? '✅' : '❌');
    console.log('- Last Sign In:', user.last_sign_in_at);
    console.log('- Created At:', user.created_at);
    
    // Check public.users table
    const { data: publicUsers, error: publicError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);
    
    if (publicError) {
      console.error('Error querying public.users:', publicError.message);
    } else if (!publicUsers || publicUsers.length === 0) {
      console.log('\n⚠️ User not found in public.users table');
    } else {
      const publicUser = publicUsers[0];
      console.log('\n📋 Public User Profile:');
      console.log('- ID:', publicUser.id);
      console.log('- Role:', publicUser.role || 'user');
      console.log('- Created At:', publicUser.created_at);
      console.log('- Updated At:', publicUser.updated_at);
    }
  } catch (error) {
    console.error('\n❌ Error checking user:');
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
checkUser(email);
