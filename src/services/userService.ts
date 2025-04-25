import { connectToSupabaseDB } from "../supabaseClient";

let supabase: any;
(async () => {
  supabase = await connectToSupabaseDB();
})();



export async function createUser({ email, name }: { email: string, name: string }) {
const { data, error } = await supabase
    .from("users")
    .insert([{ email: email, name: name }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  return data;
}
