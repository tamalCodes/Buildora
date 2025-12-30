import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
const rootEnvPath = path.resolve(process.cwd(), "..", "..", ".env");

dotenv.config({ path: envPath });
dotenv.config({ path: rootEnvPath });

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase credentials missing. Backend will run in mock mode.");
}

// We use the Service Role Key on the backend to bypass RLS and perform admin actions (like profile creation)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
