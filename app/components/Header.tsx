import { Button } from "@mantine/core";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import type { loader } from "~/root";

export function Header() {
  const { env } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const supabase = createBrowserClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkAuthStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Remix App</h1>
        {isLoggedIn && (
          <Button onClick={handleLogout} color="red">
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
