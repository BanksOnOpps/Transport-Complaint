import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data);

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) throw new Error("Not authenticated");

  const user = session.user;

  // Fetch profile from 'profiles' table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) throw new Error("Could not load user profile");

  return {
    user,
    profile,
    role: profile.role, // optional shortcut
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
