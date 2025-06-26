"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Trash2,
  Loader2,
  AlertTriangle,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";

export default function DeleteUserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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

        // Prevent admin from deleting themselves
        if (currentUser.id === params.id) {
          setError("You cannot delete your own account");
          return;
        }

        // Fetch user to delete
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
  }, [params.id, router, supabase]);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("🗑️ Attempting to delete user:", params.id);

      // Delete user from users table
      const { data, error: userError } = await supabase
        .from("users")
        .delete()
        .eq("id", params.id)
        .select(); // Add select to see what was deleted

      console.log("🗑️ Delete result:", { data, error: userError });

      if (userError) {
        console.error("❌ Delete error:", userError);
        setError(`Error deleting user: ${userError.message}`);
        return;
      }

      if (!data || data.length === 0) {
        console.warn("⚠️ No rows were deleted");
        setError(
          "No user was deleted. User may not exist or you may not have permission."
        );
        return;
      }

      console.log("✅ User deleted successfully:", data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/users");
      }, 1000);
    } catch (err) {
      console.error("❌ Exception during delete:", err);
      setError("Error deleting user");
    } finally {
      setDeleting(false);
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
        <h1 className="text-2xl font-bold">Delete User</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-red-600">Confirm User Deletion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-medium">
                  Warning: This action cannot be undone
                </p>
                <p>
                  Deleting this user will remove their access to the
                  application. They will no longer be able to log in or access
                  any features.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{user?.name || "No name"}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Role</p>
              <Badge
                variant={user?.role === "admin" ? "destructive" : "secondary"}
              >
                {user?.role === "admin" ? (
                  <Shield className="h-3 w-3 mr-1" />
                ) : (
                  <User className="h-3 w-3 mr-1" />
                )}
                {user?.role}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Created</p>
              <p className="text-sm">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {success && (
            <p className="text-green-600 text-sm">User deleted successfully!</p>
          )}

          <div className="flex gap-4 pt-4 border-t">
            <Button
              onClick={handleDelete}
              disabled={deleting}
              variant="destructive"
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </Button>
            <Link href="/admin/users">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
