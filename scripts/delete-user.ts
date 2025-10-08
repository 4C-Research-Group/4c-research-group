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

async function deleteUser(email: string) {
  try {
    console.log(`\n🔍 Searching for user: ${email}`);
    
    // Find the user by email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) throw listError;
    
    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log(`\n🗑️  Deleting user: ${user.id} (${user.email})`);
    
    // Delete from public.users first
    const { error: deleteProfileError } = await supabase
      .from('users')
      .delete()
      .eq('id', user.id);
    
    if (deleteProfileError) {
      console.warn('⚠️ Could not delete from public.users:', deleteProfileError.message);
    } else {
      console.log('✅ Deleted from public.users');
    }
    
    // Then delete from auth.users
    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(user.id);
    
    if (deleteAuthError) throw deleteAuthError;
    
    console.log('✅ Successfully deleted user from auth.users');
    
  } catch (error) {
    console.error('\n❌ Error deleting user:');
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

// Get email from command line arguments or use default
const email = process.argv[2] || 'admin@4clab.com';
deleteUser(email)
  .then(() => {
    console.log('\n✅ User deletion process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to delete user:', error);
    process.exit(1);
  });
