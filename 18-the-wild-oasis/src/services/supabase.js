import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qgcyovvlgqhckxbwyvzh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnY3lvdnZsZ3FoY2t4Ynd5dnpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NzAxODgsImV4cCI6MjAyOTQ0NjE4OH0.anmd2KNV7TVIauFrYm0RbK1EKEGLxCMkxME5WZ0FKL0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
