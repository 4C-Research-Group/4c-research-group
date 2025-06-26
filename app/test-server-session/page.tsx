import { createClient } from "@/lib/supabase/server";

export default async function TestServerSession() {
  const supabase = createClient();

  console.log("🔍 Server: Checking authentication...");

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("Server: User:", user);
  console.log("Server: Auth error:", authError);

  let userData = null;
  let roleError = null;

  if (user) {
    console.log("🔍 Server: Checking user role...");
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    userData = data;
    roleError = error;

    console.log("Server: User data:", data);
    console.log("Server: Role error:", error);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Server Session Test</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Server User:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Server Auth Error:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(authError, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">User Role Data:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Role Error:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(roleError, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Status:</h2>
          <p>{user ? "✅ Server user found" : "❌ No server user"}</p>
          <p>
            {userData?.role
              ? `✅ User role: ${userData.role}`
              : "❌ No role data"}
          </p>
        </div>
      </div>
    </div>
  );
}
