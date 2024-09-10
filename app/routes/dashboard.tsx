import { defer, json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { rlsQuery } from "db";
import type { Community } from "db/schema";
import { communities } from "db/schema";
import { AddCommunityModal } from "~/components/AddCommunityModal";
import { CommunityCard } from "~/components/CommunityCard";
import { getServerClient } from "~/utils/supabase/serverClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase } = getServerClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);

    const result = await rlsQuery(session, async (tx) => {
      return await tx.insert(communities).values(values as Community);
    });

    return json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to add community" }, { status: 500 });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = getServerClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const data = await rlsQuery(session, async (tx) => {
    return await tx.select().from(communities);
  });

  return defer({
    data,
    headers,
  });
};

export default function Dashboard() {
  const { data } = useLoaderData<typeof loader>();
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {Array.isArray(data) ? (
        <div className="max-w-screen-lg mx-auto my-10 flex gap-4 flex-wrap">
          {data.map((community: Community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      ) : (
        <div>Error: Unable to load communities data.</div>
      )}
      <AddCommunityModal />
    </>
  );
}
