-- First, drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;
DROP TRIGGER IF EXISTS update_users_updated_at
ON public.users;

-- Drop existing functions
DROP FUNCTION IF EXISTS public.handle_new_user
();
DROP FUNCTION IF EXISTS public.update_updated_at_column
();

-- Create or alter the users table
CREATE TABLE
IF NOT EXISTS public.users
(
  id uuid PRIMARY KEY REFERENCES auth.users ON
DELETE CASCADE,
  email text,
  role text
DEFAULT 'user',
  created_at timestamptz DEFAULT now
() NOT NULL,
  updated_at timestamptz DEFAULT now
() NOT NULL
);

-- Enable RLS if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1
    FROM pg_policies
    WHERE policyname = 'Public users are viewable by everyone.') THEN
    DROP POLICY "Public users are viewable by everyone." ON public.users;
END
IF;
  
  IF EXISTS (SELECT 1
FROM pg_policies
WHERE policyname = 'Users can insert their own user record.') THEN
DROP POLICY "Users can insert their own user record." ON public.users;
END
IF;
  
  IF EXISTS (SELECT 1
FROM pg_policies
WHERE policyname = 'Users can update own user record.') THEN
DROP POLICY "Users can update own user record." ON public.users;
END
IF;
END $$;

-- Recreate policies
CREATE POLICY "Public users are viewable by everyone."
  ON public.users FOR
SELECT
    USING (true);

CREATE POLICY "Users can insert their own user record."
  ON public.users FOR
INSERT
  WITH CHECK (auth.uid() =
id);

CREATE POLICY "Users can update own user record."
  ON public.users FOR
UPDATE
  USING (auth.uid()
= id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user
()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users
        (id, email, role)
    VALUES
        (NEW.id, NEW.email, 'user')
    ON CONFLICT
    (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER
INSERT ON
auth.users
FOR EACH ROW
EXECUTE
FUNCTION public.handle_new_user
();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column
()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now
();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at
CREATE OR REPLACE TRIGGER update_users_updated_at
  BEFORE
UPDATE ON public.users
  FOR EACH ROW
EXECUTE
FUNCTION public.update_updated_at_column
();

-- Add any missing columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
        AND table_name = 'users'
        AND column_name = 'role') THEN
    ALTER TABLE public.users ADD COLUMN role text DEFAULT 'user';
END
IF;
  
  IF NOT EXISTS (SELECT 1
FROM information_schema.columns
WHERE table_schema = 'public'
    AND table_name = 'users'
    AND column_name = 'created_at') THEN
ALTER TABLE public.users ADD COLUMN created_at timestamptz DEFAULT now
() NOT NULL;
END
IF;
  
  IF NOT EXISTS (SELECT 1
FROM information_schema.columns
WHERE table_schema = 'public'
    AND table_name = 'users'
    AND column_name = 'updated_at') THEN
ALTER TABLE public.users ADD COLUMN updated_at timestamptz DEFAULT now
() NOT NULL;
END
IF;
END $$;
