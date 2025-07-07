"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, User, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ChangeRolePage({ params }: { params: { id: string } }) {
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

        // Fetch user to change role
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

  const handleRoleChange = async (newRole: "admin" | "user") => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `/api/admin/users/${params.id}/change-role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Role update error:", data.error);
        setError(data.error || "Error updating user role");
        return;
      }

      setSuccess(true);
      setUser({ ...user, role: newRole });
      setTimeout(() => {
        router.push("/admin/users");
      }, 1000);
    } catch (err) {
      console.error("Exception during role update:", err);
      setError("Error updating user role");
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
        <h1 className="text-2xl font-bold">Change User Role</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{user?.name || "No name"}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Current Role</p>
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

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Change Role To</h3>

            <div className="space-y-4">
              {user?.role === "user" ? (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Admin</p>
                        <p className="text-sm text-gray-600">
                          Full access to admin panel and user management
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRoleChange("admin")}
                      disabled={saving}
                      variant="destructive"
                    >
                      {saving && (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      )}
                      Make Admin
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">User</p>
                        <p className="text-sm text-gray-600">
                          Standard user access to dashboard
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRoleChange("user")}
                      disabled={saving}
                      variant="secondary"
                    >
                      {saving && (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      )}
                      Make User
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Warning</p>
                  <p>
                    Changing user roles will affect their access permissions
                    immediately. Admin users have full access to all features
                    including user management.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {success && (
            <p className="text-green-600 text-sm">
              User role updated successfully!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
