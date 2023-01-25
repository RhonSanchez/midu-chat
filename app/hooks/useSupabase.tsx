import { useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/types/database";

type TypeSupabaseClient = SupabaseClient<Database>;

export type SupabaseOutledContext = {
  supabase: TypeSupabaseClient;
};

export const useSupabase = () => {
  const { supabase } = useOutletContext<SupabaseOutledContext>();
  return supabase;
};
