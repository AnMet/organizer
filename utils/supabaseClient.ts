import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zavpveixqqkxpehaxfjo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdnB2ZWl4cXFreHBlaGF4ZmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNjcwMjgsImV4cCI6MjA3MDc0MzAyOH0.YI9rL11MN9PSO5FA8aoN9GxRsXUYzqTYZcZiTfHMfU4";

export const supabase = createClient(supabaseUrl, supabaseKey);
