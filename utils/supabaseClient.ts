import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cpsbydgcnicgzelgdwil.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwc2J5ZGdjbmljZ3plbGdkd2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NDkxNzksImV4cCI6MjA3MDIyNTE3OX0.P4aaE9EUVJWRrinIqqws38YVG83ZXMflDizi8uTcUf4";

export const supabase = createClient(supabaseUrl, supabaseKey);
