import { json, redirect, type MetaFunction } from "@vercel/remix";
import { LoginRegisterForm } from "~/components/LoginRegisterForm";
import { getServerClient } from "~/utils/supabase/serverClient";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  };

  return { env };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { supabase, headers } = getServerClient(request);

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log({ error, data });
  if (error) {
    return json({ error: error.message }, { status: 400 });
  }

  return redirect("/dashboard", { headers });
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginRegisterForm />
    </div>
  );
}
