import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.log(
    "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env.local file"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupTeamTables() {
  console.log("🚀 Setting up team database tables...");

  try {
    // Create team_members table
    console.log("📋 Creating team_members table...");
    const { error: teamMembersError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS team_members (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          superpower TEXT,
          bio TEXT,
          education TEXT,
          location TEXT,
          image_url TEXT,
          email TEXT,
          linkedin_url TEXT,
          twitter_url TEXT,
          phone TEXT,
          is_principal_investigator BOOLEAN DEFAULT FALSE,
          display_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    });

    if (teamMembersError) {
      console.error("❌ Error creating team_members table:", teamMembersError);
      return;
    }

    // Create testimonials table
    console.log("📋 Creating testimonials table...");
    const { error: testimonialsError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS testimonials (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          quote TEXT NOT NULL,
          bio TEXT NOT NULL,
          education TEXT NOT NULL,
          image_url TEXT,
          display_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    });

    if (testimonialsError) {
      console.error("❌ Error creating testimonials table:", testimonialsError);
      return;
    }

    // Enable RLS
    console.log("🔒 Enabling Row Level Security...");
    const { error: rlsError } = await supabase.rpc("exec_sql", {
      sql: `
        ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
        ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
      `,
    });

    if (rlsError) {
      console.error("❌ Error enabling RLS:", rlsError);
      return;
    }

    // Create policies
    console.log("🔐 Creating RLS policies...");
    const { error: policiesError } = await supabase.rpc("exec_sql", {
      sql: `
        -- Team members policies
        CREATE POLICY "Allow public read access to active team members" ON team_members
          FOR SELECT USING (is_active = true);

        CREATE POLICY "Allow admins to read all team members" ON team_members
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );

        CREATE POLICY "Allow admins to insert team members" ON team_members
          FOR INSERT WITH CHECK (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );

        CREATE POLICY "Allow admins to update team members" ON team_members
          FOR UPDATE USING (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );

        CREATE POLICY "Allow admins to delete team members" ON team_members
          FOR DELETE USING (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );

        -- Testimonials policies
        CREATE POLICY "Allow public read access to active testimonials" ON testimonials
          FOR SELECT USING (is_active = true);

        CREATE POLICY "Allow admins to read all testimonials" ON testimonials
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );

        CREATE POLICY "Allow admins to insert testimonials" ON testimonials
          FOR INSERT WITH CHECK (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );

        CREATE POLICY "Allow admins to update testimonials" ON testimonials
          FOR UPDATE USING (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );

        CREATE POLICY "Allow admins to delete testimonials" ON testimonials
          FOR DELETE USING (
            EXISTS (
              SELECT 1 FROM users 
              WHERE users.id = auth.uid() 
              AND users.role = 'admin'
            )
          );
      `,
    });

    if (policiesError) {
      console.error("❌ Error creating policies:", policiesError);
      return;
    }

    // Create indexes
    console.log("📊 Creating indexes...");
    const { error: indexesError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active, display_order);
        CREATE INDEX IF NOT EXISTS idx_team_members_principal ON team_members(is_principal_investigator);
        CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active, display_order);
      `,
    });

    if (indexesError) {
      console.error("❌ Error creating indexes:", indexesError);
      return;
    }

    console.log("✅ Team database tables setup completed successfully!");
    console.log("");
    console.log("📝 Next steps:");
    console.log("1. Go to your Supabase dashboard");
    console.log("2. Navigate to the SQL Editor");
    console.log(
      "3. Run the SQL from scripts/setup-team-tables.sql to insert sample data"
    );
    console.log(
      "4. Or use the admin interface to add team members and testimonials manually"
    );
  } catch (error) {
    console.error("❌ Setup failed:", error);
  }
}

setupTeamTables();
