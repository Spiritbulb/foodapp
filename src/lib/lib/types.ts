export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  excerpt?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
};