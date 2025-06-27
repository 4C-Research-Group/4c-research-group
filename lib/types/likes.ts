export interface BlogLike {
  id: string;
  blog_post_id: string;
  user_id: string;
  created_at: string;
  user?: {
    id: string;
    email: string;
    user_metadata?: {
      name?: string;
      avatar_url?: string;
    };
  };
}

export interface LikeStats {
  total_likes: number;
  is_liked_by_user: boolean;
}
