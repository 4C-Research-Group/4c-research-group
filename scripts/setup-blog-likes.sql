-- Create blog_likes table
CREATE TABLE
IF NOT EXISTS blog_likes
(
  id UUID DEFAULT gen_random_uuid
() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts
(id) ON
DELETE CASCADE,
  user_id UUID
NOT NULL REFERENCES auth.users
(id) ON
DELETE CASCADE,
  created_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
(),
  UNIQUE
(blog_post_id, user_id)
);

-- Enable RLS
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX
IF NOT EXISTS idx_blog_likes_blog_post_id ON blog_likes
(blog_post_id);
CREATE INDEX
IF NOT EXISTS idx_blog_likes_user_id ON blog_likes
(user_id);
CREATE INDEX
IF NOT EXISTS idx_blog_likes_created_at ON blog_likes
(created_at);

-- RLS Policies

-- Allow users to view all blog likes (for counting)
CREATE POLICY "Users can view all blog likes" ON blog_likes
  FOR
SELECT USING (true);

-- Allow authenticated users to like blog posts
CREATE POLICY "Authenticated users can like blog posts" ON blog_likes
  FOR
INSERT WITH CHECK (
    auth.uid() =
user_id
AND
EXISTS
(
      SELECT 1
FROM blog_posts
WHERE id = blog_post_id
    )
);

-- Allow users to unlike their own likes
CREATE POLICY "Users can unlike their own likes" ON blog_likes
  FOR
DELETE USING (auth.uid
() = user_id);

-- Allow admins to manage all blog likes
CREATE POLICY "Admins can manage all blog likes" ON blog_likes
  FOR ALL USING
(
    EXISTS
(
      SELECT 1
FROM users
WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Grant necessary permissions
GRANT SELECT, INSERT, DELETE ON blog_likes TO authenticated;
GRANT ALL ON blog_likes TO service_role; 