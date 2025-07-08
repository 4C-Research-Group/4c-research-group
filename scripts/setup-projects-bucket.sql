-- Setup dedicated projects bucket for research project images
-- Run this in your Supabase SQL Editor

-- Create a new storage bucket specifically for projects
INSERT INTO storage.buckets
    (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    (
        'projects',
        'projects',
        true,
        52428800, -- 50MB file size limit
        ARRAY
['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT
(id) DO NOTHING;

-- Create RLS policies for the projects bucket
-- Allow public read access to all project images
CREATE POLICY "Public can view project images" ON storage.objects
  FOR
SELECT USING (bucket_id = 'projects');

-- Allow authenticated users to upload project images
CREATE POLICY "Authenticated users can upload project images" ON storage.objects
  FOR
INSERT WITH CHECK
    (
    bucket_
d = 'projects'
    AND auth.role
() = 'authenticated'
  );

-- Allow authenticated users to update their own project images
CREATE POLICY "Authenticated users can update project images" ON storage.objects
  FOR
UPDATE USING (
    bucket_id = 'projects'
AND auth.role
() = 'authenticated'
  );

-- Allow authenticated users to delete project images
CREATE POLICY "Authenticated users can delete project images" ON storage.objects
  FOR
DELETE USING (
    bucket_id
= 'projects' 
    AND auth.role
() = 'authenticated'
  );

-- Grant necessary permissions
GRANT SELECT ON storage.objects TO authenticated;
GRANT SELECT ON storage.objects TO anon;
GRANT INSERT, UPDATE, DELETE ON storage.objects TO authenticated;

-- Show the created bucket
SELECT
    id,
    name,
    public,
    file_size_limit,
    created_at
FROM storage.buckets
WHERE id = 'projects';

-- Show the policies
SELECT
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'objects'
    AND qual LIKE '%projects%'
ORDER BY policyname; 