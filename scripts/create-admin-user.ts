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

async function createAdminUser(email: string, password: string) {
  try {
    console.log(`\n🔧 Creating admin user: ${email}`);
    
    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;
    
    const existingUser = existingUsers.users.find(u => u.email === email);
    
    if (existingUser) {
      console.log(`⚠️ User ${email} already exists. Updating to admin role...`);
      
      // Update existing user's password and confirm email
      const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
        password: password,
        email_confirm: true
      });
      
      if (updateError) throw updateError;
      
      // Update role in public.users table
      const { error: updateRoleError } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('id', existingUser.id);
        
      if (updateRoleError) throw updateRoleError;
      
      console.log(`✅ Updated existing user ${email} with admin role`);
      return existingUser.id;
    }
    
    // Create new user
    const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Skip email confirmation
      user_metadata: { name: 'Admin User' }
    });
    
    if (signUpError) throw signUpError;
    
    if (!authData.user) {
      throw new Error('No user data returned after creation');
    }
    
    console.log(`✅ Created new user: ${authData.user.id}`);
    
    // Add user to public.users table with admin role
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: authData.user.id,
        email: email,
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (profileError) throw profileError;
    
    console.log(`✅ Added ${email} to public.users with admin role`);
    return authData.user.id;
    
  } catch (error) {
    console.error('\n❌ Error creating admin user:');
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

// Create admin user
const ADMIN_EMAIL = 'admin@4clab.com';
const ADMIN_PASSWORD = '4clab123'; // Updated to meet 6-char minimum

createAdminUser(ADMIN_EMAIL, ADMIN_PASSWORD)
  .then(() => {
    console.log('\n✅ Admin user setup completed successfully!');
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${'*'.repeat(ADMIN_PASSWORD.length)}`);
    console.log('\nYou can now sign in with these credentials.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to create admin user:', error);
    process.exit(1);
  });
