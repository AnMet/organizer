export interface Book {
  id: string;
  user_id: string;
  title: string;
  author?: string;
  genre?: string;
  rank?: number;
  created_at: string;
  updated_at: string;
}
