export interface CommentLike {
  id: string;
  comment_id: string;
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

export interface CommentLikeStats {
  total_likes: number;
  is_liked_by_user: boolean;
}
