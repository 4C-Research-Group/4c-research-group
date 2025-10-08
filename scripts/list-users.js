// scripts/list-users.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  console.log('Please make sure you have set:');
  console.log('NEXT_PUBLIC_SUPABASE_URL');
  console.log('SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listUsers() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    console.log('Users:');
    console.table(users);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

listUsers();
