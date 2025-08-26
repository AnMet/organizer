import type { WeatherSnapshot } from "./weather";

export type DiaryPage = {
  id: string;
  user_id: string;
  entry_date: string; // ISO date string: 'YYYY-MM-DD'
  title: string | null;
  background_color: string | null;
  mood_tag_ids: string[]; // array of static tag IDs
  weather: WeatherSnapshot | null;
  created_at: string; // ISO timestamp
  updated_at: string | null;
};

export type DiaryBlock = {
  id: string;
  page_id: string;
  block_type: "text" | "image";
  content: RichTextContent | null;
  image_url: string | null;
  position: number;
  background_color: string | null;
  created_at: string;
};

export type RichTextContent = {
  type: "doc";
  content: Array<{
    type: string;
    content?: Array<{
      type: string;
      text?: string;
      marks?: Array<{ type: string }>;
    }>;
  }>;
};
