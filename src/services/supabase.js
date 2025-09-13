import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jaytjglvjznxjoqhsdco.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheXRqZ2x2anpueGpvcWhzZGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NzA1OTEsImV4cCI6MjA2NzE0NjU5MX0.9DmjQhulaEisfZbWVGq7PimdySdAgzjgOWw1bJRGDpM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
