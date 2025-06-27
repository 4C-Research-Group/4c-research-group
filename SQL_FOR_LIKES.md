# SQL Commands for Blog Likes System

Run these commands in your Supabase SQL Editor:

```sql
-- Create blog_likes table
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_post_id, user_id) -- Prevent duplicate likes
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_likes_blog_post_id ON blog_likes(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user_id ON blog_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_created_at ON blog_likes(created_at);

-- Enable RLS
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view all likes
CREATE POLICY "Users can view likes" ON blog_likes
    FOR SELECT USING (true);

-- Authenticated users can create likes
CREATE POLICY "Authenticated users can create likes" ON blog_likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own likes
CREATE POLICY "Users can delete own likes" ON blog_likes
    FOR DELETE USING (auth.uid() = user_id);

-- Admins can do everything
CREATE POLICY "Admins can do everything" ON blog_likes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );
```

After running this SQL, the like system will be fully functional!
