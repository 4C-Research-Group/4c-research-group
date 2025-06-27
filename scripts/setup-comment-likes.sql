-- Create comment_likes table
CREATE TABLE
IF NOT EXISTS comment_likes
(
  id UUID DEFAULT gen_random_uuid
() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES blog_comments
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
(comment_id, user_id)
);

-- Enable RLS
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX
IF NOT EXISTS idx_comment_likes_comment_id ON comment_likes
(comment_id);
CREATE INDEX
IF NOT EXISTS idx_comment_likes_user_id ON comment_likes
(user_id);
CREATE INDEX
IF NOT EXISTS idx_comment_likes_created_at ON comment_likes
(created_at);

-- RLS Policies

-- Allow users to view all comment likes (for counting)
CREATE POLICY "Users can view all comment likes" ON comment_likes
  FOR
SELECT USING (true);

-- Allow authenticated users to like comments
CREATE POLICY "Authenticated users can like comments" ON comment_likes
  FOR
INSERT WITH CHECK (
    auth.uid() =
user_id
AND
EXISTS
(
      SELECT 1
FROM blog_comments
WHERE id = comment_id
    )
);

-- Allow users to unlike their own likes
CREATE POLICY "Users can unlike their own likes" ON comment_likes
  FOR
DELETE USING (auth.uid
() = user_id);

-- Allow admins to manage all comment likes
CREATE POLICY "Admins can manage all comment likes" ON comment_likes
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
GRANT SELECT, INSERT, DELETE ON comment_likes TO authenticated;
GRANT ALL ON comment_likes TO service_role; 