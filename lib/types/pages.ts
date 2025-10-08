export interface Page {
  id: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PageUpdate {
  content: string;
  updated_at: string;
}
