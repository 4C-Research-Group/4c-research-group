export interface BlogComment {
  id: string;
  blog_post_id: string;
  user_id?: string;
  author_name: string;
  author_email?: string;
  content: string;
  parent_id?: string;
  is_approved: boolean;
  is_spam: boolean;
  created_at: string;
  updated_at: string;
  replies?: BlogComment[];
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  users?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface CreateCommentData {
  blog_post_id: string;
  content: string;
  parent_id?: string;
  author_name?: string;
  author_email?: string;
}

export interface UpdateCommentData {
  content: string;
}

export interface CommentFormData {
  content: string;
  parent_id?: string;
}
