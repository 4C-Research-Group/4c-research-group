"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if current user is admin
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }

        const { data: currentUserData } = await supabase
          .from("users")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        if (currentUserData?.role !== "admin") {
          router.push("/dashboard");
          return;
        }

        // Fetch user to edit
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          setError("User not found");
          return;
        }

        setUser(userData);
      } catch (err) {
        setError("Error loading user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from("users")
        .update({
          name: user.name,
          email: user.email,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id);

      if (error) {
        setError("Error updating user");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/users");
      }, 1000);
    } catch (err) {
      setError("Error updating user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/users">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </Link>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">User ID</Label>
              <Input
                id="id"
                value={user?.id || ""}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user?.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter user name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter user email"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={user?.role === "admin" ? "destructive" : "secondary"}
                >
                  {user?.role}
                </Badge>
                <span className="text-sm text-gray-500">
                  (Change role from user management)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Created</Label>
              <p className="text-sm text-gray-600">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleString()
                  : "Unknown"}
              </p>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {success && (
              <p className="text-green-600 text-sm">
                User updated successfully!
              </p>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Link href="/admin/users">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
